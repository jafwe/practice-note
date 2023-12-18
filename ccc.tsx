{
  "field": {
    "name": "Name",
    "type": "Type",
    "value": "Value"
  },
  "form": {
    "assetName": "Asset Name",
    "assetType": "Asset Type",
    "brandManufactureCreator": "Brand/Manufacture/Creator",
    "itemPrice": "Item Price",
    "location": "Location",
    "notes": "Notes",
    "store": "Store"
  },
  "numberOfAssets": "Number Of Assets",
  "title": "Wishlist",
  "totalValue": "Total Value"
}

// ----

{
  "field": {
    "name": "名前",
    "type": "タイプ",
    "value": "価値"
  },
  "form": {
    "assetName": "資産名",
    "assetType": "資産タイプ",
    "brandManufactureCreator": "ブランド／メーカー/Creator",
    "itemPrice": "アイテムの価格",
    "location": "場所",
    "notes": "メモ",
    "store": "お店"
  },
  "numberOfAssets": "資産の数",
  "title": "欲しい物リスト",
  "totalValue": "総額"
}
// ----

import { Loader2 } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

import { Amount, AssetType, AttachmentKind } from 'core/types/common'
import { fetchPreferences } from '@/api/AccountService'
import { resolveNumberFormat } from '@/utils/userBaseConfig'
import { useAuth } from '@/store/auth'
import { Button, FormInput, FormPriceInput, FormTextarea, Icon } from '@/components/base'
import AttachmentPanel from '@/components/AttachmentPanel'
import { TabPanel, type Tab } from '@/components/TabPanel'

interface Attachment {
  key: string
  type: AttachmentKind
  name: string
}

export type WishlistValues = {
  name: string
  type: AssetType
  brand: string
  location: string
  store: string
  price: Amount
  notes: string
  mainImage: string | null
  attachments?: Attachment[]
}

const defaultValues: WishlistValues = {
  name: '',
  type: AssetType.Art,
  brand: '',
  location: '',
  store: '',
  price: { currencyKind: 'USD', amount: 0 },
  notes: '',
  mainImage: null,
  attachments: undefined
}

interface BelongingFormProps {
  assetId: string | null
  values?: WishlistValues
  submitLabel?: string
  onCancel: () => void
  onSubmit: SubmitHandler<WishlistValues>
}

export function WishlistForm({ assetId, values, submitLabel, onCancel, onSubmit }: BelongingFormProps) {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<WishlistValues>({ values, defaultValues })
  const { database } = useAuth()
  const { data: preferences } = useSWR(['preferences'], fetchPreferences(database!))
  const numberFormatConfig = resolveNumberFormat(preferences?.numberFormat)

  const tabs: Tab[] = [
    {
      key: 'primary',
      label: t('primaryDetails'),
      desc: t('required'),
      icon: <Icon name={'star'} />
    },
    {
      key: 'attachments',
      label: t('attachments'),
      icon: <Icon name={'attachment'} />
    }
  ]

  return (
    <TabPanel defaultValue={tabs[0].key}>
      {/* left */}
      <TabPanel.SideNav tabs={tabs} />

      {/* right */}
      <form className={'flex h-[600px] grow flex-col'} onSubmit={handleSubmit(onSubmit)}>
        <div className={'grow overflow-auto px-4 pt-4'}>
          <TabPanel.Section value={'primary'}>
            <div className={'flex flex-col gap-4'}>
              <FormInput control={control} name={'name'} label={t('wishlist:form.assetName')} />
              <FormInput control={control} name={'type'} label={t('wishlist:form.assetType')} />
              <FormInput control={control} name={'brand'} label={t('wishlist:form.brandManufactureCreator')} />
            </div>
            <div className={'flex flex-col gap-4'}>
              <FormInput control={control} name={'location'} label={t('wishlist:form.location')} />
              <FormInput control={control} name={'store'} label={t('wishlist:form.store')} />
              <FormPriceInput
                control={control}
                name={'price'}
                label={t('wishlist:form.itemPrice')}
                numberFormatConfig={numberFormatConfig}
              />
            </div>
            <div className={'col-span-2'}>
              <FormTextarea control={control} name={'notes'} label={t('wishlist:form.notes')} />
            </div>
          </TabPanel.Section>
          <TabPanel.Section value={'attachments'} className={'h-full md:grid-cols-1'}>
            {assetId && (
              <AttachmentPanel
                assetId={assetId}
                control={control}
                name={{ mainImage: 'mainImage', attachments: 'attachments' }}
              />
            )}
          </TabPanel.Section>
        </div>

        <fieldset className={'flex justify-end gap-2 p-4'} disabled={isSubmitting}>
          <Button className={'min-w-[130px]'} variant={'outline'} size={'md'} onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button className={'group relative min-w-[130px]'} variant={'solid'} size={'md'} type={'submit'}>
            <Loader2 className={'absolute animate-spin opacity-0 group-disabled:opacity-100'} />
            <span className={'group-disabled:opacity-0'}>{submitLabel ?? t('create')}</span>
          </Button>
        </fieldset>
      </form>
    </TabPanel>
  )
}

export function WishlistFormSkeleton() {
  return (
    <div className={'flex h-[600px] gap-x-2 p-2'}>
      <div className={'basis-52 animate-pulse rounded bg-grey/20'} />
      <div className={'grow animate-pulse rounded bg-grey/20'} />
    </div>
  )
}

// ----

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/store/auth'
import SummaryPage from '@/pages/wishlist/summary'
import { Modal } from '@/components/base'
import Confirm from '@/components/Confirm'
import { WishlistForm, type WishlistValues } from '@/components/form'

export default function CreatePage() {
  const { t } = useTranslation()
  const [isEscape, setIsEscape] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { database } = useAuth()

  const wishlistId = database!.genAssetId()

  const onClose = () => router.push('/wishlist/summary/')

  const onSubmit = async (data: WishlistValues) => {
    try {
      toast({ variant: 'success', description: 'Create wishlist successfully!' })
      onClose()
    } catch (e) {
      e instanceof Error && toast({ variant: 'error', description: e.message })
    }
  }

  return (
    <>
      <SummaryPage />

      <Modal className={'max-w-3xl'} onBackdropClick={() => setIsEscape(true)}>
        <Modal.Header className={'bg-primary'}>
          <label className={'text-sm font-medium uppercase text-white'}>{t('wishlist:title')}</label>
          <Modal.CloseButton className={'text-white'} onClose={() => setIsEscape(true)} />
        </Modal.Header>
        <WishlistForm assetId={wishlistId} onCancel={onClose} onSubmit={onSubmit} />
      </Modal>

      {isEscape && (
        <Confirm
          title={t('unsavedChanges')}
          content={t('closeDialog')}
          onCancel={() => setIsEscape(false)}
          cancelLabel={t('keepEditing')}
          onConfirm={onClose}
          confirmLabel={t('discardChanges')}
        />
      )}
    </>
  )
}

// ---

import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { cn } from '@/utils/classnames'
import { getNestedValue } from '@/utils/formatter'
import { formatNumber } from '@/utils/userBaseConfig'
import { useMockBackendListHandler } from '@/hooks/useMockBackendListHandler'
import { Icon, Pagination, Table, type Column } from '@/components/base'
import FixedButton from '@/components/FixedButton'
import Summary from '@/components/Summary'
import { Toolbar, ToolbarContent, ToolbarItem } from '@/components/Toolbar'

type Wish = {
  name: string
  type: string
  value: number
}

export default function SummaryPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const view = searchParams.get('view') ?? 'card'

  const mockStats = [
    { label: t('wishlist:numberOfAssets'), value: 0 },
    { label: t('wishlist:totalValue'), value: 0, unit: 'USD' }
  ]

  const mockData: Wish[] = [
    { name: 'test wish', type: t('collectables:tabs.wine'), value: 10 },
    { name: '123', type: t('collectables:tabs.art'), value: 0 },
    { name: 'A rock', type: t('collectables:tabs.other'), value: 5 }
  ]
  const columns: Column<Wish>[] = useMemo(() => {
    return [
      {
        field: 'name',
        headerName: t('wishlist:field.name'),
        headerAlign: 'left',
        renderCell: (item) => {
          const username = getNestedValue(item, 'name') ?? ''
          return <span>{username}</span>
        }
      },
      {
        field: 'type',
        headerName: t('wishlist:field.type'),
        headerAlign: 'left',
        renderCell: (item) => {
          const type = getNestedValue(item, 'type') ?? ''
          return <span>{type}</span>
        }
      },
      {
        field: 'value',
        headerName: t('wishlist:field.value'),
        headerAlign: 'left',
        renderCell: (item) => {
          const value = getNestedValue(item, 'value') ?? ''
          return (
            <span>
              {'USD'} {formatNumber(value)}
            </span>
          )
        }
      }
    ]
  }, [t])
  const [list, totalCount] = useMockBackendListHandler<Wish>(mockData, ['name', 'type'])

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={'mx-auto p-4 xl:max-w-screen-xl'}>
      <h2 className={'mb-4 text-lg text-white'}>{t('wishlist:title')}</h2>
      <Summary className={'mb-5'} stats={mockStats} />
      <div className={'flex flex-col gap-2'}>
        <Toolbar>
          <ToolbarContent />
          <ToolbarContent className={'justify-end'}>
            <ToolbarItem>
              <Icon name={'excel'} className={'cursor-pointer text-grey-disable'} />
            </ToolbarItem>
            <ToolbarItem>
              <Link href={`?${new URLSearchParams({ view: 'card' })}`}>
                <Icon name={'card-view'} className={cn(view === 'card' ? 'text-primary' : 'text-grey')} />
              </Link>
              <Link href={`?${new URLSearchParams({ view: 'list' })}`}>
                <Icon name={'list-view'} className={cn(view === 'list' ? 'text-primary' : 'text-grey')} />
              </Link>
            </ToolbarItem>
            <ToolbarItem>
              <Icon name={'filter'} className={'cursor-pointer text-grey-disable'} />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
        <Table columns={columns} dataList={list} />
        <Pagination totalCount={totalCount} />
      </div>
      <FixedButton label={'Create Contact'} onClick={() => router.push('/wishlist/create/')} />
    </motion.main>
  )
}

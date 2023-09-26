import {
    ArrowLeftFromLine,
    Menu,
    type LucideProps
}
from 'lucide-react'

const IconMap = {
    ArrowLeftFromLine,
    Menu
}

// Omit : ignore certain key ('name') of specific type (LucideProps)

interface IconProps extends Omit<LucideProps, 'name'> {
    name: keyof typeof IconMap
}

export default function Icon ({name, size = '18px', ...props}: IconProps) {
    const IC = IconMap[name]
    return <IC size={size} {...props} />
}

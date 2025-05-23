import type { ReactNode } from "react"

interface ColorfulIconProps {
  children: ReactNode
  color: string
}

export const ColorfulIcon = ({ children, color }: ColorfulIconProps) => {
  return <div style={{ color: color, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
}

import { ReactNode } from 'react'
import Header from '../header'

interface CommonInterface {
    children: ReactNode
}

function Common({ children }: CommonInterface) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Common
import { ScrollArea } from "@mantine/core"
import Footer from "../layout/Footer"

export default ({ children }) => {
    return (
        <ScrollArea className="relative" scrollHideDelay={100}>
        <div className="mt-24  ">
           
            <div className="relative px-2 ">

            <hr className="" />
           
            {children}
            </div>
           
           <Footer />
          
        </div>
        </ScrollArea>
    )
}
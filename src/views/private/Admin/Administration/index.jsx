import { Button, Card, CardSection, Divider, Grid, Text } from "@mantine/core"
import PageProvider from "../../../../providers/PageProvider"
import { route } from "preact-router"
import { IconPremiumRights, IconUserCheck } from "@tabler/icons"
import {useState} from 'preact/hooks'
import { FaUserEdit, FaUsersCog } from 'react-icons/fa'
export default () => {
    

    const [data, setData] = useState({
        "User Management": {
            icon: <FaUserEdit size={30} className="text-[#0071b9]" />,
            route: 'users'
        },
        "Roles and Permissions": {
            // icon: <IconPremiumRights size={25} className="text-[#0071b9]" />,
            icon : <FaUsersCog size={30} className="text-[#0071b9]" />,
            route: 'r&p'
        }
    })

    return (
        <PageProvider>
            <div class=''>
                <Card>
                    <CardSection className="p-2">

                        {/* <h6 className='font-bold text-neutral-700 tracking-wider'>Administration</h6>
                        <Divider /> */}
                        <div>

                           

                            {
                                Object.keys(data).map((key, index) => {
                                    return (
                                        <Button variant="subtle" className="p-2 m-2" size="xl" onClick={() => { route(`/administration/${data[key].route}`) }} key={index} >
                                            <div className={'flex flex-col items-center justify-center'}>
                                                {data[key].icon}
                                                <Text size={'xs'}>{key}</Text>
                                            </div>
                                        </Button>
                                    )
                                })
                            }

                        </div>
                    </CardSection>
                </Card>
            </div>
        </PageProvider>
    )
}
import { Divider, Menu } from "@mantine/core"
import { IconAddressBook, IconMap, IconPhotoPlus, IconPlus, IconVideo, IconVideoPlus } from "@tabler/icons"
import { mapStyle } from "./Map"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState } from "react"
import { addressPointsCRUDstate } from "./AddressPoints"
import { signal } from "@preact/signals"
import { useEffect } from "preact/hooks"
import { FabClass } from "../../../../layout"

export default ({ modal = false, webview = false }) => {

    const [activeOption, setActiveOption] = useState(null)

    const Options = {
        'Address Point': {
            icon: <IconAddressBook className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                addressPointsCRUDstate.value = 'add'
            },
            "antiMethod": () => {
                addressPointsCRUDstate.value = ''
            }
        },
        // 'Photo': {
        //     icon: <IconPhotoPlus className="scale-110 text-[#0071b9]" />,
        //     selectable: !webview,
        //     "method": () => {
        //         if (webview) {
        //             parent.postMessage({ type: 'addPhoto' }, '*')
        //             window.webkit.messageHandlers.jsHandler.postMessage({ type: 'addPhoto' })
        //         }
        //     },
        //     "antiMethod": () => {

        //     }
        // },
        // 'Video': {
        //     icon: <IconVideoPlus className="scale-110 text-[#0071b9]" />,
        //     selectable: !webview,
        //     "method": () => {
        //         if (webview) {
        //             parent.postMessage({ type: 'addVideo' }, '*')
        //             window.webkit.messageHandlers.jsHandler.postMessage({ type: 'addVideo' })
        //         }
        //     },
        //     "antiMethod": () => {

        //     }
        // }
    }

    useEffect(() => {
        addressPointsCRUDstate.subscribe(() => {
            if (addressPointsCRUDstate.value === 'add') {
                setActiveOption('Address Point')
            } else {
                setActiveOption(null)
            }
        })
    }, [])

    const AddControlButton = <div className={`mt-2 ${FabClass}  ${activeOption ? 'bg-red-500 text-white' : 'bg-white text-[#0071b9]'}`}>

        <IconPlus className="scale-150" />
    </div>

    if (activeOption) {
        return (
            <div onClick={() => {
                setActiveOption(null)
                // call all anti methods
                Object.keys(Options)?.map((key, index) => {
                    Options[key].antiMethod()
                })
            }}>
                {AddControlButton}
            </div>
        )
    }

    if (modal) {
        return (
            <div
                onClick={() => {
                    openModal({
                        title: 'Create',
                        children: (
                            <div className="flex flex-col gap-2">
                                {
                                    Object.keys(Options)?.map((key, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    if (Options[key].selectable) setActiveOption(key)
                                                    Options[key].method()
                                                    if (modal) closeAllModals()
                                                }}
                                            >
                                                <div className="flex items-center gap-2 cursor-pointer">
                                                    {Options[key].icon}
                                                    <b className=" text-[#0071b9] tracking-wide font-bold">
                                                        {key}
                                                    </b>
                                                </div>
                                                <Divider className="my-2" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
                }}
            >
                {AddControlButton}
            </div>

        )
    }

    return (

        <Menu position="left-end" withArrow >
            <Menu.Target>
                {AddControlButton}
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(Options)?.map((key, index) => {
                        return (
                            <Menu.Item key={index}
                                onClick={() => {
                                    if (Options[key].selectable) setActiveOption(key)
                                    Options[key].method()
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {Options[key].icon}
                                    <b className=" text-[#0071b9] tracking-wide font-bold">
                                        {key}
                                    </b>
                                </div>
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}
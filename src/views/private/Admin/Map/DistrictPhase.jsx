import { useEffect, useState } from "preact/hooks"
import { dropvalue } from "../../../../layout/Header"

import { Source, Layer, useMap } from "react-map-gl"
import { getDistrictPhase } from "../../../../api"
import { signal } from "@preact/signals"

let SAMPLE =
    [{
        'json': {
            "type": "Feature",
            "geometry": "{\"type\":\"MultiPolygon\",\"coordinates\":[[[[7.702432445,50.77844968],[7.703857498,50.775932652],[7.707970279,50.775940245],[7.710029985,50.772812691],[7.71659772,50.773414317],[7.719008699,50.770080297],[7.718942485,50.765090262],[7.724261682,50.763219059],[7.718699791,50.760420515],[7.723096039,50.757183567],[7.720482498,50.754369597],[7.721644393,50.750760368],[7.723654125,50.750547028],[7.725065262,50.753639262],[7.733844956,50.751267427],[7.737249123,50.748700415],[7.728390094,50.748839676],[7.726043156,50.744501395],[7.715548481,50.742091427],[7.71451344,50.737208592],[7.708212795,50.739837772],[7.696862704,50.741116961],[7.685103743,50.740511165],[7.683768979,50.738082823],[7.678699375,50.737615653],[7.679828893,50.735735701],[7.671044684,50.735558653],[7.673114442,50.738742862],[7.669391316,50.740718457],[7.649039725,50.742225276],[7.638916896,50.739611787],[7.635348025,50.735667739],[7.617680942,50.732688827],[7.614171998,50.734076047],[7.612854773,50.74124784],[7.608184018,50.742096557],[7.601277375,50.746795891],[7.595850105,50.746229995],[7.593199274,50.74761064],[7.595610613,50.751093004],[7.591374911,50.753419862],[7.589398679,50.756516688],[7.597917968,50.76097989],[7.597054038,50.763653401],[7.599122901,50.76534421],[7.59857323,50.766712067],[7.600930549,50.767539076],[7.604961081,50.766082587],[7.607657512,50.768573245],[7.61388038,50.768482528],[7.61750103,50.770350533],[7.629296959,50.768765297],[7.637256676,50.77010749],[7.642615841,50.76847852],[7.64470036,50.768925902],[7.645529143,50.771022349],[7.655510266,50.768032442],[7.655055757,50.770148823],[7.658188973,50.769980856],[7.662563336,50.772737921],[7.658738642,50.784538848],[7.661119189,50.785812584],[7.668111643,50.78640841],[7.673450452,50.780834671],[7.677821591,50.781414373],[7.677750691,50.789157889],[7.682729021,50.79424588],[7.679899188,50.798866477],[7.675021028,50.80254824],[7.676075649,50.80476159],[7.674858259,50.80667143],[7.678954648,50.809600238],[7.662978518,50.816878149],[7.65932807,50.820211161],[7.674507462,50.818995333],[7.700562034,50.825180641],[7.702413745,50.822699332],[7.69889575,50.82223612],[7.694403987,50.819106292],[7.691985932,50.814281035],[7.693205138,50.81337172],[7.692831068,50.808643728],[7.699918605,50.804836224],[7.698400888,50.795733574],[7.702128956,50.793960901],[7.701147414,50.789638145],[7.70887048,50.782493198],[7.702432445,50.77844968]]]]}",
            "properties": {
                "status": "Finalisierung Netzdetailplanung durch TRC"
            }
        }
    }]

let statuses = {
    1: 'Onboarding',
    2: 'APV: Validierung durch TRC',
    3: 'APV: Validierung durch Kommune',
    4: 'NPV: Netzplanaufbereitung durch TRC',
    5: 'NPV: Netzplanaufbereitung durch Kommune',
    6: 'Finalisierung Netzdetailplanung durch TRC',
    7: 'Finalisierung Netzdetailplanung durch Kommune',
}

export const DistrictPhaseVisibility = signal(false)
export const DistrictPhaseLayersVisibility = signal({
    "Finalisierung Netzdetailplanung durch TRC": true,
    "Abgeschlossen":true,
    "Noch nicht begonnen":true,
    "NPV: Netzplanaufbereitung durch TRC":true
})

export default ({ id = false, grouped = false }) => {
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)
    const [layersVisible, setLayersVisible] = useState({})
    useEffect(() => {
        getDistrictPhase().then(({ data }) => {

            const parsed = data[0].map(({ json }) => {
                const { geometry, properties } = json
                properties.phase = statuses[properties.phase]

                return {
                    geometry: JSON.parse(geometry),
                    properties
                }
            })

            let geojson = {
                type: "FeatureCollection",
                features: parsed.filter(feature => feature.geometry.coordinates[0] !== undefined)
            }
         

            setData(geojson)
        })
        DistrictPhaseVisibility.subscribe(setVisible)
        DistrictPhaseLayersVisibility.subscribe(setLayersVisible)
    }
        , [])
    return (
        <>
            {
                (data.features && visible) && (
                    <Source id="district-phase" type="geojson" data={data}>
                        <Layer
                            id="district-phase-layer"
                            type="fill"
                            paint={{
                                "fill-color": [
                                    "match",
                                    ["get", "status"],
                                    "Finalisierung Netzdetailplanung durch TRC", "orange",
                                    "Abgeschlossen", "#c6efce",
                                    "Noch nicht begonnen", "#808080",
                                    "NPV: Netzplanaufbereitung durch TRC", "#ffeb9c",
                                    'grey'
                                ],
                                "fill-opacity": 0.5
                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                            beforeId="waterway"
                        />
                        <Layer
                            id="district-phase-layer-line"
                            type="line"
                            paint={{
                                "line-color": "orange",
                                "line-width": 1,
                                "line-opacity": 0.6
                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                            beforeId="waterway"
                        />
                        <Layer
                            minzoom={8}
                            id="district-phase-layer-text"
                            type="symbol"
                            layout={{
                                "text-field": '{phase}',

                                "text-size": 12,
                                "text-offset": [0, 0.6],
                                "text-anchor": "top"
                            }}
                            paint={{
                                "text-color": "blue",
                                "text-halo-color": "white",
                                "text-halo-width": 1

                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                        />
                    </Source>
                )
            }
        </>
    )
}
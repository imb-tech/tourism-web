import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DASHBOARD_STATUS_DETAIL } from "@/constants/api-endpoints"
import formatMoney from "@/lib/format-money"
import { cn } from "@/lib/utils"
import { useGet } from "@/services/default-requests"
import { useNavigate, useParams } from "@tanstack/react-router"
import { memo, ReactNode, useMemo } from "react"

function H3({ children }: { children: ReactNode }) {
    return <h3 className="font-semibold text-lg pt-3">{children}</h3>
}

function P({ children, head }: { children: ReactNode; head?: boolean }) {
    if (head) {
        return (
            <p className="text-secondary-foreground font-medium text-[#0A1E56]">
                {children}
            </p>
        )
    }
    return <p className="text-black/80 font-light text-sm">{children}</p>
}

function Div({ children }: { children: ReactNode }) {
    return <section className="grid grid-cols-6 mb-10">{children}</section>
}

function Box({ children }: { children: ReactNode }) {
    return (
        <section className="flex flex-col col-span-5 gap-1">{children}</section>
    )
}

function Col({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-5 py-3 border-b border-secondary">
            {children}
        </div>
    )
}

const Title = memo(H3)
const Text = memo(P)
const Grid = memo(Div)
const Flex = memo(Box)
const Column = memo(Col)

export default function DocumentTab() {
    const { day, plan } = useParams({ from: "/_main/document/$plan/$day" })
    const navigate = useNavigate()

    const { data } = useGet<ApiResponse>(
        DASHBOARD_STATUS_DETAIL + `/${plan}/${day}`,
    )

    const options = useMemo(
        () =>
            Array(data?.days)
                .fill(0)
                .map((_, ind) => ({ id: ind + 1, name: `Day ${ind + 1}` })),
        [data?.days],
    )

    return (
        <div className="px-3">
            <Tabs
                value={day || "1"}
                className="relative overflow-auto p-0 mb-5"
                onValueChange={(value) => {
                    navigate({
                        to: "/document/$plan/$day",
                        params: {
                            plan,
                            day: value,
                        },
                    })
                }}
            >
                <div className={cn("flex items-center w-max overflow-auto")}>
                    <TabsList className="relative flex items-center justify-between overflow-hidden p-0 h-auto">
                        {options.map((t, i) => (
                            <TabsTrigger
                                key={i}
                                data-index={t?.id}
                                value={t.id.toString()}
                                className="min-w-24 transition-all duration-150 text-sm"
                            >
                                {t.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </Tabs>

            <section className="max-w-full">
                {data?.cities && (
                    <Grid>
                        <Title>Shahar:</Title>
                        <Flex>
                            <Column>
                                <Text head>Shahar</Text>
                            </Column>

                            <Column>
                                <Text>{data?.cities}</Text>
                            </Column>
                        </Flex>
                    </Grid>
                )}

                {data?.guide && (
                    <Grid>
                        <Title>Gid:</Title>
                        <Flex>
                            <Column>
                                <Text head>Ismi</Text>
                                <Text head>Telefon</Text>
                                <Text head>Narxi</Text>
                            </Column>

                            {data?.guide?.map((u) => (
                                <Column key={u.id}>
                                    <Text>{u.dashboard_data.full_name}</Text>
                                    <Text>{u.dashboard_data.phone}</Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.hotel && (
                    <Grid>
                        <Title>Mehmonxona:</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Xona turi</Text>
                                <Text head>Narxi</Text>
                                <Text head>Soni</Text>
                                <Text head>Jami narxi</Text>
                            </Column>

                            {data?.hotel?.map((u) => (
                                <Column key={u.id}>
                                    <Text>{u.dashboard_data.hotel_name}</Text>
                                    <Text>{u.dashboard_data.room_name}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>{u.dashboard_data.count}</Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.trans_in && (
                    <Grid>
                        <Title>Transport (ichki):</Title>
                        <Flex>
                            <Column>
                                <Text head>Haydovchi F.I.O</Text>
                                <Text head>Telefon</Text>
                                <Text head>Narxi</Text>
                                <Text head>Transport turi</Text>
                                <Text head>Transport</Text>
                            </Column>

                            {data?.trans_in?.map((u) => (
                                <Column key={u.id}>
                                    <Text>{u.dashboard_data.driver}</Text>
                                    <Text>{u.dashboard_data.driver_phone}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.transport_name}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.company_phone}
                                    </Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.trans_out && (
                    <Grid>
                        <Title>Transport (tashqi):</Title>
                        <Flex>
                            <Column>
                                <Text head>Haydovchi F.I.O</Text>
                                <Text head>Telefon</Text>
                                <Text head>Narxi</Text>
                                <Text head>Transport turi</Text>
                                <Text head>Transport</Text>
                            </Column>

                            {data?.trans_out?.map((u) => (
                                <Column key={u.id}>
                                    <Text>{u.dashboard_data.driver}</Text>
                                    <Text>{u.dashboard_data.driver_phone}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.transport_name}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.company_phone}
                                    </Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.dinner && (
                    <Grid>
                        <Title>Restoran (tushlik):</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Narxi</Text>
                            </Column>

                            {data?.dinner?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.restaurant_name}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.lunch && (
                    <Grid>
                        <Title>Restoran (tushlik):</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Narxi</Text>
                            </Column>

                            {data?.lunch?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.restaurant_name}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.train && (
                    <Grid>
                        <Title>Poyezd:</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Class</Text>
                                <Text head>Narxi</Text>
                                <Text head>Soni</Text>
                                <Text head>Jami narxi</Text>
                            </Column>

                            {data?.train?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.from_city_name}{" "}
                                        {u.dashboard_data.to_city_name}
                                    </Text>
                                    <Text>{u.dashboard_data.klass}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.tourists_count}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.plane && (
                    <Grid>
                        <Title>Samalyot:</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Class</Text>
                                <Text head>Narxi</Text>
                                <Text head>Soni</Text>
                                <Text head>Jami narxi</Text>
                            </Column>

                            {data?.plane?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.from_city_name}{" "}
                                        {u.dashboard_data.to_city_name}
                                    </Text>
                                    <Text>{u.dashboard_data.klass}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.tourists_count}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.entrance && (
                    <Grid>
                        <Title>Entrances:</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Soni</Text>
                                <Text head>Narxi</Text>
                                <Text head>Jami narx</Text>
                            </Column>

                            {data?.entrance?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.entrance_name}
                                    </Text>
                                    <Text>
                                        {u.dashboard_data.tourist_count}
                                    </Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}

                {data?.other && (
                    <Grid>
                        <Title>Boshqa:</Title>
                        <Flex>
                            <Column>
                                <Text head>Nomi</Text>
                                <Text head>Izoh</Text>
                                <Text head>Narxi</Text>
                                <Text head>Jami narx</Text>
                            </Column>

                            {data?.other?.map((u) => (
                                <Column key={u.id}>
                                    <Text>
                                        {u.dashboard_data.category_name}
                                    </Text>
                                    <Text>{u.dashboard_data.desc}</Text>
                                    <Text>
                                        {formatMoney(u.dashboard_data.price)}
                                    </Text>
                                    <Text>{formatMoney(u.amount)}</Text>
                                </Column>
                            ))}
                        </Flex>
                    </Grid>
                )}
            </section>
        </div>
    )
}

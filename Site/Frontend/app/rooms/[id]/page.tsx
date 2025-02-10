'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function RoomPage() {
  const params = useParams()
  const [room, setRoom] = useState<any>(null)
  const [shelves, setShelves] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const pollingInterval = 10000; // 10 seconds

  useEffect(() => {
    const fetchRoomData = async (initialFetch = false) => {
      try {
        if (initialFetch) {
          setLoading(true);
        }

        const response = await fetch(`http://127.0.0.1:5100/room/${params.id}/shelves`)
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`)
        }
        const data = await response.json()

        setRoom({ id: data.room_id, name: `Room ${data.room_id}` })
        setShelves(data.shelves)
        setError(null)
      } catch (err: any) {
        setError(err.message)
      } finally {
        if (initialFetch) {
          setLoading(false);
        }
      }
    }

    fetchRoomData(true)
    const intervalId = setInterval(() => fetchRoomData(false), pollingInterval)

    return () => clearInterval(intervalId)
  }, [params.id])

  // New hook for periodic chart data updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShelves((prevShelves) => [...prevShelves]) // Trigger a re-render to update graphs
    }, pollingInterval)

    return () => clearInterval(intervalId)
  }, [pollingInterval])

  if (loading && !room) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  const formatValue = (value: number) => {
    return value !== undefined && value !== null ? value.toFixed(2) : 'N/A'
  }

  const units: { [key: string]: string } = {
    CO2: "ppm",
    Humidity: "%",
    Light_PAR: "μmol/m²/s",
    Nutrients_EC: "mS/cm",
    Temperature: "°C",
    Water_Level: "cm",
    pH: ""
  }

  const getLatestSensorData = (shelf: any) => {
    const latestData: { [key: string]: any } = {}
    Object.keys(shelf.sensors).forEach(sensorType => {
      const latestSensor = shelf.sensors[sensorType][shelf.sensors[sensorType].length - 1]
      latestData[sensorType] = {
        value: latestSensor ? latestSensor.value : 'N/A',
        unit: units[sensorType] || ''
      }
    })
    return latestData
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toUTCString();
  }

  const generateChartData = (sensorData: { timestamp: string, value: number }[]) => {
    return sensorData
      .map((data) => ({
        time: formatTimestamp(data.timestamp).toLocaleString(),
        value: data.value
      }))
      ;
  }

  const sensorIcons: { [key: string]: string } = {
    CO2: "mdi:molecule-co2",
    Humidity: "mdi:water-percent",
    Light_PAR: "mdi:weather-sunny",
    Nutrients_EC: "mdi:leaf",
    Temperature: "mdi:thermometer",
    Water_Level: "mdi:water",
    pH: "mdi:ph"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-primary"
        >
          {room.name}
        </motion.h1>

        {/* Table for Latest Sensor Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Live Shelf Sensor Values</CardTitle>
              <CardDescription>Current sensor readings for each shelf</CardDescription>
            </CardHeader>
            <CardContent>
              <Table className="table-auto w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center p-3 bg-gray-200">Shelf ID</TableHead>
                    {shelves[0]?.sensors && Object.keys(shelves[0]?.sensors).map((sensorType) => (
                      <TableHead key={sensorType} className="text-center p-3 bg-gray-200">
                        <div className="flex items-center justify-center gap-2">
                          <Icon icon={sensorIcons[sensorType]} className="w-6 h-6 text-primary" />
                          {sensorType}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shelves.map((shelf) => {
                    const latestData = getLatestSensorData(shelf)

                    return (
                      <TableRow key={shelf.shelf_id} className="hover:bg-gray-100">
                        <TableCell className="text-center p-3">{shelf.shelf_id}</TableCell>
                        {Object.keys(latestData).map((sensorType) => (
                          <TableCell key={sensorType} className="text-center p-3">
                            {formatValue(latestData[sensorType].value)} {latestData[sensorType].unit}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed History of Sensor Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <Card className="shadow-lg rounded-lg border border-gray-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">Historical Shelf Conditions</CardTitle>
              <CardDescription className="text-sm text-gray-500">Historical sensor values and graphs for each shelf</CardDescription>
            </CardHeader>
            <CardContent>
              {shelves.map((shelf) => {
                const sensorTypes = Object.keys(shelf.sensors);

                return (
                  <div key={shelf.shelf_id} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-black">Shelf ID: {shelf.shelf_id}</h3>
                    {sensorTypes.map((sensorType) => {
                      const sensorData = shelf.sensors[sensorType];

                      return (
                        <div key={sensorType} className="mb-6">
                          <h4 className="text-xl font-medium mb-2 flex items-center gap-2 text-primary">
                            <Icon icon={sensorIcons[sensorType]} className="w-6 h-6 text-primary" />
                            {sensorType}
                          </h4>

                          {/* Scrollable Graph */}
                          <div className="mt-6 max-h-96 overflow-y-auto">
                            <ResponsiveContainer width="100%" height={300}>
                              <LineChart data={generateChartData(sensorData)}>
                                <CartesianGrid strokeDasharray="5 5" />
                                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                  wrapperStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                                  labelStyle={{ fontSize: '12px' }}
                                  contentStyle={{ fontSize: '14px', padding: '10px' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                                <Brush
                                  dataKey="time"
                                  startIndex={sensorData.length - 10}
                                  endIndex={sensorData.length - 1}
                                  height={20}
                                  stroke="#8884d8"
                                  fill="#8884d8"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>

                          {/* Scrollable Historical Data Table */}
                          <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg shadow-sm mb-4">
                            <Table className="min-w-full">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="p-4 bg-gray-100 text-center text-sm font-semibold text-gray-700">Timestamp</TableHead>
                                  <TableHead className="p-4 bg-gray-100 text-center text-sm font-semibold text-gray-700">Value</TableHead>
                                  <TableHead className="p-4 bg-gray-100 text-center text-sm font-semibold text-gray-700">Unit</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {sensorData.reverse().map((data, index) => (
                                  <TableRow key={data.timestamp} className={`transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`}>
                                    <TableCell className="p-4 text-center text-sm text-gray-600">{formatTimestamp(data.timestamp)}</TableCell>
                                    <TableCell className="p-4 text-center text-sm text-gray-800 font-semibold">
                                      {formatValue(data.value)}
                                    </TableCell>
                                    <TableCell className="p-4 text-center text-sm text-gray-500">{units[sensorType]}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

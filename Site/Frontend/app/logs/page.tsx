'use client'

import { useEffect, useState } from 'react'
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { jwtDecode } from 'jwt-decode'
import { useAuth } from "@/lib/auth"

export default function LogsPage() {
  const { user, loading } = useAuth();
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [selectedLogId, setSelectedLogId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken.id;
    const userRole = decodedToken.role;

    const fetchLogs = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5015/sensor-maintenance?user_id=${userId}&role=${userRole}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        const data = await response.json();
        setLogs(data.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, [loading, user]);

  const filteredLogs = logs.filter(log => 
    (log.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.sensor_id.toString().includes(searchTerm) ||
     log.sensor_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || log.status.toLowerCase() === filterType.toLowerCase())
  );

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const getLogTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleExportLogs = () => {
    const csvContent = [
      ['Timestamp', 'Sensor Name', 'Sensor ID', 'Review', 'Datetime Review', 'Status'],
      ...currentLogs.map(log => [
        log.timestamp, log.sensor_name, log.sensor_id, log.review, log.datetime_review, log.status
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, "sensor_maintenance_logs.csv");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Sensors Alert Logs</h1>
        <Card>
          <CardHeader>
            <CardTitle>Log Management</CardTitle>
            <CardDescription>View and filter sensors alert logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end gap-4 mb-4">
              <div className="w-1/3">
                <Label htmlFor="search">Search Logs</Label>
                <Input
                  id="search"
                  placeholder="Search by review, sensor ID, or sensor name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-1/3">
                <Label htmlFor="filter">Filter by Status</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="filter">
                    <SelectValue placeholder="Select log status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleExportLogs}>Export Logs</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Datetime Review</TableHead>
                  <TableHead>Sensor Name</TableHead>
                  <TableHead>Sensor ID</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recommendations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {currentLogs.map((log) => (
    <TableRow key={log.id}>
      <TableCell>{log.timestamp}</TableCell>
      <TableCell>{log.sensor_name}</TableCell>
      <TableCell>{log.sensor_id}</TableCell>
      <TableCell>{log.review}</TableCell>
      <TableCell>
        <Badge className={getLogTypeColor(log.status)}>
          {log.status}
        </Badge>
      </TableCell>  
      <TableCell>
        <Button onClick={() => setSelectedLogId(log.id)}>Show Actions</Button>
      </TableCell> 
    </TableRow>
  ))}
</TableBody>
            </Table>

            <div className="flex justify-between mt-4 items-center">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
                First
              </Button>
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </Button>
              <div className="flex gap-2">
                {currentPage > 3 && (
                  <Button onClick={() => setCurrentPage(1)}>1</Button>
                )}
                {currentPage > 4 && <span className="px-2">...</span>}
                {Array.from({ length: 5 }).map((_, index) => {
                  const page = currentPage - 2 + index;
                  if (page > 0 && page <= totalPages) {
                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? 'outline' : 'default'}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                  return null;
                })}
                {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                {currentPage < totalPages - 2 && (
                  <Button onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
                )}
              </div>
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </Button>
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                Last
              </Button>
            </div>
          </CardContent>
        </Card>
        <ActionsPopup
          logId={selectedLogId}
          logs={logs}
          onClose={() => setSelectedLogId(null)}
        />
      </main>
    </div>
  );
}

const ActionsPopup = ({ logId, logs, onClose }) => {
  const log = logs.find(log => log.id === logId);

  if (!log) return null;

  const generateRecommendations = (alertType) => {
    if (!alertType) return "No specific recommendation available.";

    const recommendationsMap = {
      "Overheat": "Increase ventilation or turn on cooling systems.",
      "High humidity detected": "Activate dehumidifiers or improve air circulation.",
      "High CO2 detected": "Increase ventilation to improve air quality.",
      "Low water level detected": "Refill water reservoir or check for leaks.",
      "Excessive light detected": "Reduce light intensity or adjust shading.",
      "High nutrient concentration detected": "Dilute nutrient concentration to balance levels.",
      "Abnormal pH detected": "Adjust pH levels using appropriate solutions."
    };

    return recommendationsMap[alertType] || "Everything is normal.";
  };

  const recommendation = generateRecommendations(log.review);
  console.log(log.review);
  return (
    <Dialog open={!!logId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actions for {log.sensor_name}</DialogTitle>
          <DialogDescription>
            Here are the recommended actions for this sensor.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p><strong>Review:</strong> {log.review}</p>
          <p><strong>Recommendations:</strong> {recommendation}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

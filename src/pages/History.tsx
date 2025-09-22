import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

const HistoryPage = () => {
  const rows = [
    { id: "1", date: "Sep 18, 2025", length: "02:40" },
    { id: "2", date: "Sep 17, 2025", length: "03:20" },
    { id: "3", date: "Sep 15, 2025", length: "04:05" },
  ];

  return (
    <Card className="w-full max-w-5xl shadow-2xl backdrop-blur-lg bg-card/80 border border-border/40">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Reflection History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Length</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((t) => (
              <TableRow
                key={t.id}
                className="hover:bg-accent/40 transition-colors"
              >
                <TableCell className="font-medium">{t.date}</TableCell>
                <TableCell>{t.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoryPage;

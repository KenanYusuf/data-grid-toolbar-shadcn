import * as React from "react";
import {
  ChevronDown as ChevronDownIcon,
  Columns3 as ColumnsIcon,
  Download as DownloadIcon,
  ListFilter as ListFilterIcon,
  Printer as PrinterIcon,
  Rows3 as RowsIcon,
  Table as TableIcon,
} from "lucide-react";
import { DataGrid, Grid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

function Toolbar() {
  const [view, setView] = React.useState("grid");

  return (
    <Grid.Toolbar.Root>
      <Grid.ColumnsPanel.Trigger
        render={(props) => (
          <Tooltip>
            <TooltipTrigger>
              <Grid.Toolbar.Button
                {...props}
                render={
                  <Button variant="ghost">
                    <ColumnsIcon />
                  </Button>
                }
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">Columns</TooltipContent>
          </Tooltip>
        )}
      />

      <Grid.FilterPanel.Trigger
        render={(props, state) => (
          <Tooltip>
            <TooltipTrigger>
              <Grid.Toolbar.Button
                {...props}
                render={
                  <Button variant="ghost" className="relative">
                    <ListFilterIcon />
                    {state.filterCount > 0 && (
                      <Badge className="absolute top-0 right-0">
                        {state.filterCount}
                      </Badge>
                    )}
                  </Button>
                }
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">Filters</TooltipContent>
          </Tooltip>
        )}
      />

      <Separator orientation="vertical" className="mx-1" />

      <Grid.Export.PrintTrigger
        render={(props) => (
          <Tooltip>
            <TooltipTrigger>
              <Grid.Toolbar.Button
                {...props}
                render={
                  <Button variant="ghost">
                    <PrinterIcon />
                  </Button>
                }
              />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Print</p>
            </TooltipContent>
          </Tooltip>
        )}
      />

      <DropdownMenu>
        <Grid.Toolbar.Button
          render={(props) => (
            <Tooltip>
              <DropdownMenuTrigger>
                <TooltipTrigger>
                  <Button variant="ghost" {...props}>
                    <DownloadIcon />
                    <ChevronDownIcon />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent side="bottom">Download</TooltipContent>
            </Tooltip>
          )}
        />
        <DropdownMenuContent>
          <Grid.Export.CsvTrigger
            render={<DropdownMenuItem>Download as CSV</DropdownMenuItem>}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <Grid.Toolbar.ToggleButtonGroup
        value={view}
        color="primary"
        className="ml-auto"
        onChange={(value: string) => setView(value)}
        render={(props) => (
          <ToggleGroup
            type="single"
            onValueChange={props.onChange}
            {...props}
          />
        )}
      >
        <Grid.Toolbar.ToggleButton
          value="grid"
          aria-label="Grid view"
          render={(props) => (
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <ToggleGroupItem {...props}>
                    <TableIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">Grid view</TooltipContent>
            </Tooltip>
          )}
        />

        <Grid.Toolbar.ToggleButton
          value="list"
          aria-label="List view"
          render={(props) => (
            <Tooltip>
              <TooltipTrigger>
                <div>
                  <ToggleGroupItem {...props}>
                    <RowsIcon />
                  </ToggleGroupItem>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">List view</TooltipContent>
            </Tooltip>
          )}
        />
      </Grid.Toolbar.ToggleButtonGroup>
    </Grid.Toolbar.Root>
  );
}

export default function App() {
  const { data, loading } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });

  return (
    <TooltipProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ height: 500, width: 800 }}>
          <DataGrid {...data} loading={loading} slots={{ toolbar: Toolbar }} />
        </div>
      </div>
    </TooltipProvider>
  );
}

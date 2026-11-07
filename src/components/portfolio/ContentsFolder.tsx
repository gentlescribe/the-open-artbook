import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FolderClosed, FolderOpen, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function ContentsFolder() {
  const [open, setOpen] = useState(false);
  const FolderIcon = open ? FolderOpen : FolderClosed;
  return (
    <div className="fixed right-4 top-4 z-40 md:right-8 md:top-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-gold/40 bg-background/95 font-serif text-base text-gold" aria-label="Contents" title="Contents">
            <FolderIcon /> Contents
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10} className="kraft w-64 border-kraft-deep p-5 text-ink">
          <p className="mb-3 border-b border-ink/20 pb-2 font-type text-sm">Contents</p>
          <nav aria-label="Page contents" className="flex flex-col gap-1">
            <Button asChild variant="ghost" className="justify-between font-serif text-lg hover:bg-ink/10 hover:text-ink">
              <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-ink/10" }} onClick={() => setOpen(false)}>Portfolio <ArrowUpRight /></Link>
            </Button>
            <Button asChild variant="ghost" className="justify-between font-serif text-lg hover:bg-ink/10 hover:text-ink">
              <Link to="/starrstream" activeProps={{ className: "bg-ink/10" }} onClick={() => setOpen(false)}>The Starrstream <ArrowUpRight /></Link>
            </Button>
          </nav>
        </PopoverContent>
      </Popover>
    </div>
  );
}
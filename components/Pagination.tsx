import React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
interface PaginationControlsProps {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  pageOptions: number[];
  setCurrentPage: (page: number) => void;
  totalPages: () => number;
}

const Pagination: React.FC<PaginationControlsProps> = ({
  prevPage,
  nextPage,
  currentPage,
  pageOptions,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <div className="flex gap-1 justify-center items-center mt-2">
      <Button variant="outline" onClick={prevPage} disabled={currentPage === 1}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <Select onValueChange={(value: string) => setCurrentPage(Number(value))}>
        <SelectTrigger className="w-full max-w-full md:max-w-32">
          <SelectValue placeholder={`Page ${currentPage ? currentPage : 1}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Page</SelectLabel>
            {pageOptions.map((page, index) => (
              <SelectItem key={index} value={String(page)}>
                Page {page}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={nextPage}
        disabled={currentPage === totalPages()}
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;

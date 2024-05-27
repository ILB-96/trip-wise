"use client";

import { PaginationNext, PaginationPrevious } from "@components/ui/pagination";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count, items_per_page = 2 }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = items_per_page * (parseInt(page.toString()) - 1) > 0;
  const hasNext =
    items_per_page * (parseInt(page.toString()) - 1) + items_per_page < count;

  const handleChangePage = (type: string) => {
    type === "prev"
      ? params.set("page", (parseInt(page.toString()) - 1).toString())
      : params.set("page", (parseInt(page.toString()) + 1).toString());
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      {hasPrev && (
        <PaginationPrevious
          className={styles.button}
          onClick={() => handleChangePage("prev")}
        />
      )}
      {!hasPrev && (
        <PaginationPrevious className="text-gray-300 hover:text-gray-300 hover:pointer-events-none hover:bg-transparent" />
      )}

      {hasNext && (
        <PaginationNext
          className={styles.button}
          onClick={() => handleChangePage("next")}
        />
      )}
      {!hasNext && (
        <PaginationNext className="text-gray-300 hover:text-gray-300 hover:pointer-events-none hover:bg-transparent" />
      )}
    </div>
  );
};

export default Pagination;

import { init } from "./state/tableState.js";
import { genTable } from "./genTable.js";
import { frame } from "./frame.js";
import { ColumnOptions, TableOptions } from "./types.js";

/**
 * A function that converts objects into a string that prints out as a table.
 *
 * @param data The content for the table. An array or an object.
 * @param columnOptions Optional column data to control selection, ordering, heading and alignment.
 * @param tableOptions Optional global options to control table features
 * @returns A string representation of the table
 */
export function tableString(
  data: object,
  columnOptions?: ColumnOptions,
  tableOptions?: TableOptions
): string {
  if (typeof data !== "object" || data === null) return "";

  if (!Array.isArray(data)) {
    return recurseWithArrayFromObject(data, columnOptions, tableOptions);
  }

  init(data, columnOptions, tableOptions);
  return genTable(data, frame.characters);
}

function recurseWithArrayFromObject(
  data: object,
  columns: ColumnOptions,
  options: TableOptions
) {
  const values = [];
  Object.keys(data).forEach(
    (key: string) =>
      typeof data[key] !== "function" && values.push({ key, data: data[key] })
  );
  if (options?.propertyCompareFunction !== null) {
    values.sort(
      options?.propertyCompareFunction ?? ((a, b) => a.key.localeCompare(b.key))
    );
  }
  return tableString(
    values.map((a) => a.data),
    columns,
    { ...options, index: values.map((a) => a.key) }
  );
}
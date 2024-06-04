"use client";
import { useForm, FormProvider } from "react-hook-form";
import { Search, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import { useState, useMemo, useCallback } from "react";
import findCities from "@helpers/findCities";
import InputAutoComplete from "@components/Places/InputAutoComplete";

const MenuList = (props: any) => {
  const { options, children, maxHeight, getValue } = props;
  const height = 300;
  const itemHeight = 55;

  const [value] = getValue();
  const initialOffset = options.indexOf(value) * itemHeight;

  return (
    <List
      width={207}
      height={Math.min(height, maxHeight)}
      itemCount={children.length}
      itemSize={itemHeight}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div
          style={{
            ...style,
            overflow: "hidden",
            overscrollBehavior: "none",
          }}
        >
          <span>{children[index]}</span>
        </div>
      )}
    </List>
  );
};

const AttSearch = ({ options }: { options: Record<string, any> }) => {
  const [localOptions, setLocalOptions] = useState(options);
  const methods = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = useCallback(
    (data: any) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.keys(data).forEach((key) => {
        params.delete(key);
        if (data[key]) {
          params.set(key, data[key]);
        }
      });
      if (data.price) {
        const newPrice =
          data.price === "Free" ? 1 : data.price.match(/\$/g)?.length || -1;
        params.set("price", newPrice.toString());
      }
      if (data.rating) {
        const rating = data.rating.match(/⭐/g)?.length || 0;
        params.set("rating", rating.toString());
      } else {
        params.delete("rating");
      }
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleClearParams = useCallback(() => {
    methods.reset();
    router.replace(pathname);
    setLocalOptions(options); // Reset the localOptions to initial state
  }, [methods, router, pathname, options]);

  const handleChange = useCallback(
    (value: string, name: string) => {
      if (name === "country") {
        methods.setValue("location", "");
        let cities = findCities([value]);
        cities = Array.from(new Set(cities)); // Convert Set to array here
        setLocalOptions((prevOptions) => ({
          ...prevOptions,
          location: {
            title: "Location",
            selections: cities.length ? cities : ["No cities found"],
          },
        }));
      }
    },
    [methods]
  );

  const formatOptions = (options: string[]) =>
    options.map((option) => ({ value: option, label: option }));

  const memoizedOptions = useMemo(
    () =>
      Object.entries(localOptions).map(([key, value]) => (
        <FormField
          key={key}
          control={methods.control}
          name={key}
          render={({ field }) => (
            <FormItem className="w-52">
              <Select
                options={formatOptions(value.selections)}
                onChange={(selected) => {
                  field.onChange(selected?.value);
                  handleChange(selected?.value || "", key);
                }}
                value={
                  field.value
                    ? { value: field.value, label: field.value }
                    : null
                }
                placeholder={value.title}
                components={{ MenuList }}
              />
            </FormItem>
          )}
        />
      )),
    [localOptions, handleChange, methods.control]
  );

  return (
    <div className="flex max-sm:justify-center z-50">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 place-content-center grid-cols-3 gap-2 border-2 p-4 shadow-xl rounded-xl">
            {memoizedOptions}
            <FormField
              control={methods.control}
              name="q"
              render={({ field }) => (
                <FormItem className="max-sm:col-span-1 sm:col-span-2">
                  <FormControl>
                    <InputAutoComplete
                      className="w-full"
                      type="text"
                      field={field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 place-content-end col-span-1 sm:col-start-2 md:col-start-3 max-sm:justify-center">
              <Button
                className="flex w-fit rounded-3xl"
                variant="destructive"
                type="button"
                onClick={handleClearParams}
              >
                <Trash2 />
              </Button>
              <Button
                className="flex w-fit rounded-3xl bg-blue-400"
                variant="outline"
                type="submit"
              >
                <Search />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AttSearch;

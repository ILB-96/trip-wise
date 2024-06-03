"use client";
import { useForm, FormProvider } from "react-hook-form";
import { Search, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@components/ui/separator";
import { useState } from "react";
import findCities from "@helpers/findCities";
import InputAutoComplete from "@components/Places/InputAutoComplete";

const AttSearch = ({ options }: { options: Record<string, any> }) => {
  const [localOptions, setLocalOptions] = useState(options);
  const methods = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: any) => {
    router.replace(pathname);
    const params = new URLSearchParams(searchParams.toString());
    for (const key in data) {
      params.delete(key);
      if (
        data[key] &&
        data[key] !== undefined &&
        data[key] !== "undefined" &&
        data[key] !== ""
      ) {
        params.set(key, data[key]);
      }
    }
    params.set("page", "1");
    if (data.price) {
      let newPrice = -1;
      if (data.price === "Free") {
        newPrice = 1;
      } else {
        newPrice = data.price.match(/\$/g)?.length;
      }
      params.set("price", newPrice.toString());
    }
    if (data.rating) {
      // count the number of ⭐ in the string
      const rating = data.rating.match(/⭐/g)?.length;
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleClearParams = () => {
    methods.reset();
    router.replace(pathname);
  };

  const handleChange = (value: string, name: string) => {
    if (name === "country") {
      methods.setValue("location", "");
      let cities = findCities([value]);
      // Update the local options state with new cities
      cities = Array.from(new Set(cities));
      cities = cities.length ? cities : ["No cities found"];

      setLocalOptions((prevOptions) => ({
        ...prevOptions,
        location: {
          title: "Location",
          selections: cities,
        },
      }));
    }
  };

  return (
    <>
      <div className="flex max-sm:justify-center">
        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 place-content-center grid-cols-3 gap-2 border-2 p-4 shadow-xl rounded-xl">
                {Object.entries(localOptions).map(([key, value]) => {
                  return (
                    <FormField
                      key={key}
                      control={methods.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem className="w-52">
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleChange(value, key);
                            }}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={value.title} />
                            </SelectTrigger>
                            <SelectContent>
                              {value.selections.map(
                                (option: string, index: number) => (
                                  <SelectItem
                                    key={`${key}-${option}-${index}`}
                                    value={option}
                                  >
                                    {option}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  );
                })}
                <FormField
                  control={methods.control}
                  name="q"
                  render={({ field }) => (
                    <FormItem className="max-sm:col-span-1 sm:col-span-2">
                      <FormControl>
                        <InputAutoComplete
                          className="w-full"
                          type="text"
                          // placeholder="Search..."
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
        </FormProvider>
      </div>
    </>
  );
};

export default AttSearch;

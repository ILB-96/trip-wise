"use client";
import { useForm, FormProvider } from "react-hook-form";
import { Search, Trash2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@components/ui/separator";

const SearchComp = ({ options }: { options: Record<string, any> }) => {
  const methods = useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (data.q && data.q.length > 2) {
      params.set("q", data.q);
    } else {
      params.delete("q");
    }

    if (data.country) {
      params.set("country", data.country);
    } else {
      params.delete("country");
    }

    if (data.rating) {
      // count the number of ⭐ in the string
      const rating = data.rating.match(/⭐/g)?.length;
      params.set("rating", rating);
    } else {
      params.delete("rating");
    }

    if (data.sortBy) {
      params.set("sortBy", data.sortBy);
    } else {
      params.delete("sortBy");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  const handleClearParams = () => {
    methods.reset();
    router.replace(pathname);
  };

  return (
    <>
      <div className="flex justify-around">
        <FormProvider {...methods}>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex w-3/5 flex-col gap-3 my-2"
            >
              <div className="flex justify-center gap-3 max-md:flex-col">
                <Button
                  className="flex w-fit rounded-3xl "
                  variant="destructive"
                  type="button"
                  onClick={handleClearParams}
                >
                  <Trash2 />
                </Button>
                {Object.entries(options).map(([key, value]) => {
                  return (
                    <FormField
                      key={key}
                      control={methods.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem className="w-52 focus:outline-none">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={value.title} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {value.selections.map((option: string) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
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
                    <FormItem>
                      <FormControl>
                        <Input type="text" placeholder="Search..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  className="flex w-fit rounded-3xl bg-blue-400"
                  variant="outline"
                  type="submit"
                >
                  <Search />
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
      <Separator />
    </>
  );
};

export default SearchComp;

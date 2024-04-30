"use client"

import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {NumberInput} from "@/components/ui/number-input";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {BadgeHelp} from "lucide-react";

const formNet = z.enum(['BTC'] as const);
const toNet = z.enum(['TRON','ETH'] as const);
const routing = z.object({
   formNet,toNet
})
const fee = z.coerce.number({
    required_error: "fee is required",
})
    .max(1,{message:"the number is too big"})
    .min(0.0001,{message:"the number is too small"});

const sendNum = z.coerce.number({
    required_error: "Age is required",
}).positive();

const formSchema = z.object({
    sendNum,fee,routing
});


export function SwapForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            routing:{
                formNet:formNet.enum.BTC,
                toNet:toNet.enum.TRON
            },
            sendNum:0,
            fee:0.0008
        },
    })
    const {register} =form;

    return (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="flex justify-center">
                                    <FormLabel className="text-center">Swap Routing</FormLabel>
                                </div>
                                <div style={{margin:0}} className="m-0 flex justify-around">
                                <FormField
                                    control={form.control}
                                    name="routing.formNet"
                                    render={({ field }) => {
                                        const form = formNet.enum.BTC;
                                        return (
                                            <FormItem>
                                                    <FormControl className="inline">
                                                        <Select {...field}  disabled>
                                                            <SelectTrigger className="w-24">
                                                                <SelectValue placeholder={form} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value={form}>{form}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    {/*<FormControl className="inline">*/}
                                                    {/*        <Select {...register('routing.toNet')}>*/}
                                                    {/*        <SelectTrigger className="w-24">*/}
                                                    {/*            <SelectValue placeholder={to[0]} />*/}
                                                    {/*        </SelectTrigger>*/}
                                                    {/*        <SelectContent>*/}
                                                    {/*            {to.map((v)=>(<SelectItem key={v} value={v}>{v}</SelectItem>))}*/}
                                                    {/*        </SelectContent>*/}
                                                    {/*    </Select>*/}
                                                    {/*</FormControl>*/}
                                                <FormMessage />
                                            </FormItem>
                                        )}}/>
                                <FormField
                                    control={form.control}
                                    name="routing.toNet"
                                    render={({ field }) => {
                                        const to = toNet.options;
                                        return (
                                            <FormItem>
                                                {/*<FormLabel className="text-center">Swap Routing</FormLabel>*/}
                                                <FormControl>
                                                    <Select {...field}>
                                                        <SelectTrigger className="w-24">
                                                            <SelectValue placeholder={to[0]} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {to.map((v)=>(<SelectItem key={v} value={v}>{v}</SelectItem>))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}}/>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="sendNum"
                                    render={({ field }) => (
                                        <FormItem className="p-4 ease-out duration-500 bg-gary rounded-md ">
                                            <div className="flex justify-between">
                                                <FormLabel className="self-center">Send</FormLabel>
                                                <Button type="button" className="font-extralight text-sky-500 inline bg-transparent p-0 hover:bg-transparent blue">Max</Button>
                                            </div>
                                            <FormControl>
                                                <NumberInput type='number' placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription className="text-center">
                                                Please enter the amount to send
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                        <FormItem className="p-4 ease-out duration-500 bg-gary rounded-md ">
                                            <div className="flex justify-between">
                                                <FormLabel className="self-center">received</FormLabel>
                                                <HoverCard>
                                                    <HoverCardTrigger asChild>
                                                        <Button type="button" className="bg-transparent p-0 hover:bg-transparent">
                                                            <BadgeHelp size={18} className="stroke-1 stroke-gary-300" />
                                                        </Button>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        The data is a prediction result and is for reference only
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                            <FormControl>
                                                <NumberInput disabled type='number' value={0}  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                <FormField
                                    control={form.control}
                                    name="fee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Fee</FormLabel>
                                            <FormControl>
                                                <Input className="text-center" type='number' placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit">Submit</Button>
                            </form>
                        </Form>
    )

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
}

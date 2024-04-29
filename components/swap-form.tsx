"use client"

import { z } from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

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
        // <Card>
        //             <CardHeader className='center'>
        //                 <CardTitle>Places Send Me Your Gold</CardTitle>
        //                 <CardDescription>And then turn gold into coins by minting it.</CardDescription>
        //             </CardHeader>
        //             <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="routing"
                                    render={({ field }) => {
                                        const form = formNet.enum.BTC;
                                        const to = toNet.options;
                                        const {onChange,value} = field;
                                        return (
                                            <FormItem>
                                                <FormLabel>Swap Routing</FormLabel>
                                                <div className="flex justify-between">
                                                    <FormControl className="inline">
                                                        <Select value={value.formNet}  disabled>
                                                            <SelectTrigger className="w-44">
                                                                <SelectValue placeholder={form} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value={form}>{form}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl className="inline">
                                                            <Select {...register('routing.toNet')}>
                                                            <SelectTrigger className="w-44">
                                                                <SelectValue placeholder={to[0]} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {to.map((v)=>(<SelectItem key={v} value={v}>{v}</SelectItem>))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>

                                                </div>
                                                <FormDescription>
                                                    Please select the blockchain you want to mint tokens on
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}}
                                />
                                {/*<FormField*/}
                                {/*    control={form.control}*/}
                                {/*    name="toNet"*/}
                                {/*    render={({ field }) => {*/}
                                {/*        return (*/}
                                {/*            <FormItem>*/}
                                {/*                <FormLabel>form</FormLabel>*/}
                                {/*                <FormControl>*/}
                                {/*                    <Select>*/}
                                {/*                        <SelectTrigger className="w-44">*/}
                                {/*                            <SelectValue placeholder={to[0]} />*/}
                                {/*                        </SelectTrigger>*/}
                                {/*                        <SelectContent>*/}
                                {/*                            {to.map((v)=>(<SelectItem key={v} value={v}>{v}</SelectItem>))}*/}
                                {/*                        </SelectContent>*/}
                                {/*                    </Select>*/}
                                {/*                </FormControl>*/}
                                {/*                <FormDescription>*/}
                                {/*                    This is your public display name.*/}
                                {/*                </FormDescription>*/}
                                {/*                <FormMessage />*/}
                                {/*            </FormItem>*/}
                                {/*        )}}*/}
                                {/*/>*/}

                                <FormField
                                    control={form.control}
                                    name="sendNum"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Send</FormLabel>
                                            <FormControl>
                                                <Input type='number' placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Please enter the amount to send
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fee"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Fee</FormLabel>
                                            <FormControl>
                                                <Input type='number' placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Please enter the maximum value for the fee rang
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    // {/*// </CardContent>*/}
                    // {/*// <CardFooter>*/}
                    // {/*//     <p>Card Footer</p>*/}
                    // {/*// </CardFooter>*/}
           // {/*</Card>*/}
    )

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
}

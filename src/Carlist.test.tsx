import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render,screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Carlist from "./components/Carlist";
import '@testing-library/jest-dom/vitest';
import React from "react";
import userEvent from '@testing-library/user-event';


const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            retry: false,
        }
    }
})

const wrapper = ({children}: {children: React.ReactNode}) =>(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe("Carlist tests",()=>{
    test("Component Renders", () =>{
        render(<Carlist />, {wrapper});
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    })

    test("Car are fetched", async() =>{
        render(<Carlist />,{ wrapper });

        await waitFor(() => screen.getByText(/New Car/i));
        expect(screen.getByText(/Ford/i)).toBeInTheDocument();
    })

    test("Open new car model", async() =>{
        render(<Carlist />, {wrapper});

        await waitFor(()=>screen.getByText(/New Car/i));
        await userEvent.click(screen.getByText(/New Car/i));
        expect(screen.getByText(/SAVE/i)).toBeInTheDocument();
    })
})
import { setupServer } from "msw/node";
import { handlers } from "../utils/mocks/handlers";

export const server = setupServer(...handlers);

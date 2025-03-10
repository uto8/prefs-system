import { Issue } from "./Issue"

export type Notification ={
  id: number;
  type: number;
  createdAt: Date;
  issue: Issue;
}

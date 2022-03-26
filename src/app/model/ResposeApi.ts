import {Notification} from "./Notification";

export interface ResposeApi<T> {
  data: T,
  notification: Notification;
}

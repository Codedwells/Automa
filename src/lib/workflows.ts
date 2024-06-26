import { TSortableItems } from '@/components/store/sortable-items-store'
import { UniqueIdentifier } from '@dnd-kit/core'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'


export type TLogItem = {
  id: UniqueIdentifier
  requestType: string
  responseCode: number
  time: string
  name:string
  data: any
}

// TEST URL https://httpbin.org/get
// https://jsonplaceholder.typicode.com/todos/1

export const runWorkflows = async (sortableItems: TSortableItems[]): Promise<TLogItem[]> => {
  const logs: TLogItem[] = []

  if (!sortableItems) return logs

  for (const item of sortableItems) {
    if (item.workflows) {
      for (const workflow of item.workflows) {
        try {
          const response = await axios.get(workflow.endpoint)
          logs.push({
            id: uuidv4(),
            name: workflow.name,
            time: new Date().toISOString(),
            requestType: 'GET',
            responseCode: response.status,
            data: response.data
          })
        } catch (error:any) {
          logs.push({
            id: uuidv4(),
            name: workflow.name,
            time: new Date().toISOString(),
            requestType: 'GET',
            responseCode: error.response?.status || 500,
            data: error.response?.data || { message: error.message }
          })
        }
      }
    }
  }

  return logs
}

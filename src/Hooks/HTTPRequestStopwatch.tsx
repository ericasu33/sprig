import { useState, useEffect } from 'react'
import axios from 'axios';

export function useAxiosGet( url : string ) {
  interface Stopwatches {
    entry_id: number;
    start_time: Date;
    pause_start_time: Date;
    end_time: Date;
    cumulative_pause_duration: number;
    intensity: number;
    category_name: string;
    category_color: string;
  }

  interface Request {
    loading: boolean;
    data: Object | null;
    error: boolean;
  }
  
  const [request, setRequest] = useState<Request>({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    // Give loader prior to image being loaded
    setRequest((prev) => {
      return {
        ...prev,
        loading: true,
      }
    })

    axios.get<Stopwatches[]>(url)
      .then(response => {
        setRequest((prev) => {
          return {
            ...prev,
            loading: false,
            data: response.data,
          }
        })
      })
      .catch(() => {
        setRequest({
          loading: false,
          data: null,
          error: true,
        })
      })
  }, [url])

  return request

}
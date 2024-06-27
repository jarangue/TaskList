import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({  
    reducerPath: 'api', //nombre del slice
    baseQuery: fetchBaseQuery({
         baseUrl: 'http://localhost:3001' 
        }), //url base de la api

    endpoints: (builder) => ({ //build permite definir las propiedades de la api

        getTasks: builder.query({
            query: () => '/tasks',
            providesTags: ['Tasks'],
            
        }),

        createTasks: builder.mutation({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks'],
        }),

        updateTasks: builder.mutation({
            query: ({updatedTask}) => ({
                url: `/tasks/${updatedTask.id}`,
                method: 'PATCH',
                body: updatedTask,
            }),
            invalidatesTags: ['Tasks'],
        }),

        deleteTasks: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),

        

    }),
})

export const { useGetTasksQuery, useCreateTasksMutation, useDeleteTasksMutation, useUpdateTasksMutation } = apiSlice
import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName, chooseDescription, choosePowers, chooseEnemies, chooseMovies, chooseComics, chooseShows } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { StringLiteral } from 'typescript';
import { useGetData } from '../../custom-hooks';

interface MarvelFormProps {
    id?:string;
    data?:{}
}

interface MarvelState {
    name: string;
    description: string;
    powers: string;
    enemies: string;
    movies: string;
    comics: string;
    shows: string;
}

export const MarvelForm = (props:MarvelFormProps) => {

    const dispatch = useDispatch();
    let { marvelData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<MarvelState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(choosePowers(data.powers))
            dispatch(chooseEnemies(data.enemies))
            dispatch(chooseMovies(data.movies))
            dispatch(chooseComics(data.comics))
            dispatch(chooseShows(data.shows))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Superhero</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="powers">Powers</label>
                    <Input {...register('powers')} name="powers" placeholder="Powers"/>
                </div>
                <div>
                    <label htmlFor="enemies">Enemies</label>
                    <Input {...register('enemies')} name="enemies" placeholder="Enemies"/>
                </div>
                <div>
                    <label htmlFor="movies">Movies</label>
                    <Input {...register('movies')} name="movies" placeholder="Movies"/>
                </div>
                <div>
                    <label htmlFor="comics">Comics</label>
                    <Input {...register('comics')} name="comics" placeholder="Comics"/>
                </div>
                <div>
                    <label htmlFor="shows">Shows</label>
                    <Input {...register('shows')} name="shows" placeholder="Shows"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
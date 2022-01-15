import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  fetchMoviesList,
  fetchPopularContentList,
  fetchLatestContentList,
} from '../../modules/movies'
import { Spin } from 'antd'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'

const List = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [trendingData, setTrendingData] = useState({
    mediaType: 'all',
    timeWindow: 'day',
  })
  const [popularData, setPopularData] = useState('movie')
  const [latestData, setLatestData] = useState('movie')

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const response = await props.fetchMoviesList(trendingData)
      setIsLoading(false)
    }
    fetchData()
  }, [trendingData])

  useEffect(() => {
    props.fetchPopularContentList(popularData)
  }, [popularData])

  useEffect(() => {
    props.fetchLatestContentList(latestData)
  }, [latestData])
  return (
    <Fragment>
      {/* trending list */}
      <div>
        <Header>
          <h3>Trending</h3>
          <ul>
            <li
              className={clsx({
                active: trendingData.timeWindow === 'day',
              })}
              onClick={() =>
                setTrendingData({
                  mediaType: 'all',
                  timeWindow: 'day',
                })
              }>
              All Day
            </li>
            <li
              className={clsx({
                active: trendingData.timeWindow === 'week',
              })}
              onClick={() =>
                setTrendingData({
                  mediaType: 'all',
                  timeWindow: 'week',
                })
              }>
              This Week
            </li>
          </ul>
        </Header>
        {isLoading ? (
          <Spin />
        ) : (
          <ImagesWrapper>
            {props.moviesList && props.moviesList.length
              ? props.moviesList.map((item) => (
                  <div key={item.id}>
                    <img
                      src={
                        'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                        item.poster_path
                      }
                      alt="images"
                    />
                    <h4>{item.title}</h4>
                  </div>
                ))
              : null}
          </ImagesWrapper>
        )}
      </div>

      <hr style={{ margin: '5rem 0' }} />
      {/* popular list */}
      <div>
        <Header>
          <h3>What's Popular</h3>
          <ul>
            <li
              className={clsx({
                active: popularData === 'movie',
              })}
              onClick={() => setPopularData('movie')}>
              Movies
            </li>
            <li
              className={clsx({
                active: popularData === 'person',
              })}
              onClick={() => setPopularData('person')}>
              People
            </li>
            <li
              className={clsx({
                active: popularData === 'tv',
              })}
              onClick={() => setPopularData('tv')}>
              TV
            </li>
          </ul>
        </Header>
        <ImagesWrapper>
          {props.popularContentList && props.popularContentList.length
            ? props.popularContentList.map((item) => (
                <div key={item.id}>
                  <img
                    src={
                      popularData === 'tv'
                        ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                          item.poster_path
                        : popularData === 'person'
                        ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                          item.profile_path
                        : 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                          item.poster_path
                    }
                    alt="images"
                  />
                  <h4>{item.name || item.title}</h4>
                </div>
              ))
            : null}
        </ImagesWrapper>
      </div>

      <hr style={{ margin: '5rem 0' }} />
      {/* latest list */}
      <div>
        <Header>
          <h3>What's Popular</h3>
          <ul>
            <li
              className={clsx({
                active: latestData === 'movie',
              })}
              onClick={() => setLatestData('movie')}>
              Movies
            </li>
            <li
              className={clsx({
                active: latestData === 'person',
              })}
              onClick={() => setLatestData('person')}>
              People
            </li>
            <li
              className={clsx({
                active: latestData === 'tv',
              })}
              onClick={() => setLatestData('tv')}>
              TV
            </li>
          </ul>
        </Header>
        <ImagesWrapper>
          {!isEmpty(props.latestContentList) ? (
            <div key={props.latestContentList.id}>
              <img
                src={
                  latestData === 'tv'
                    ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                      props.latestContentList.poster_path
                    : latestData === 'person'
                    ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                      props.latestContentList.profile_path
                    : 'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                      props.latestContentList.poster_path
                }
                alt="images"
              />
              <h4>
                {props.latestContentList.title
                  ? props.latestContentList.title
                  : props.latestContentList.name}
              </h4>
            </div>
          ) : null}
        </ImagesWrapper>
      </div>
    </Fragment>
  )
}
const mapStateToProps = (state) => ({
  moviesList: state.movies.moviesList,
  popularContentList: state.movies.popularContentList,
  latestContentList: state.movies.latestContentList,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMoviesList,
      fetchPopularContentList,
      fetchLatestContentList,
    },
    dispatch
  )

const Header = styled.div`
  display: flex;
  align-items: baseline;
  margin: 0 20px;
  ul {
    list-style: none;
    display: inline-flex;
    border: 1px solid;
    padding: 0;
    margin-left: 20px;
    border-radius: 12px;
    li {
      padding: 10px;
      display: block;
      cursor: pointer;
      &:first-child {
        margin-right: 10px;
      }
      &.active {
        background-color: black;
        color: #1ed5a9;
        border-radius: 11px;
      }
    }
  }
`

const ImagesWrapper = styled.div`
  display: flex;
  width: 700px;
  overflow-x: auto;
  margin: 10px auto;
  img {
    width: 150px;
    height: auto;
  }
  div {
    margin: 0 15px;
    display: inline-table;
    min-width: 200px;
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(List)

import { Input, Pagination } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import List from '../List/List'
import { fetchSearchResults } from '../../modules/movies'
import styled from 'styled-components'
import { ArrowLeftOutlined } from '@ant-design/icons'

const Home = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const numEachPage = 5
  const [maxPageCount, setMaxPageCount] = useState(5)
  const [minPageCount, setMinPageCount] = useState(0)

  function handlePagination(value) {
    setMinPageCount((value - 1) * numEachPage)
    setMaxPageCount(!value ? numEachPage : value * numEachPage)
  }

  return (
    <div>
      {props.searchList && props.searchList.length ? (
        <BackButton
          onClick={() => {
            props.fetchSearchResults('')
            setSearchValue('')
          }}>
          <ArrowLeftOutlined />
          Back
        </BackButton>
      ) : null}
      <SearchWrapper>
        <Input
          name="search"
          type="text"
          placeholder="Search for movies"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={() => props.fetchSearchResults(searchValue)}>
          Search
        </button>
      </SearchWrapper>
      {props.searchList && props.searchList.length ? (
        <div>
          {props.searchList.slice(minPageCount, maxPageCount).map((item) => (
            <div>
              <Card>
                <img
                  src={
                    'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                    item.poster_path
                  }
                  alt="poster_path"
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.overview || 'No description'}</p>
                </div>
              </Card>
            </div>
          ))}

          <Pagination
            style={{
              display: 'block',
              margin: '40px auto',
              width: 'fit-content',
              paddingBottom: '2rem',
            }}
            defaultCurrent={1}
            defaultPageSize={numEachPage}
            onChange={handlePagination}
            total={props.searchList && props.searchList.length}
          />
        </div>
      ) : (
        <List />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  searchList: state.movies.searchList,
})
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchSearchResults,
    },
    dispatch
  )

const BackButton = styled.span`
  display: flex;
  padding: 10px;
  align-items: center;
  width: 85px;
  justify-content: space-between;
  border: 1px solid;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`
const Card = styled.div`
  display: flex;
  padding: 2rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid rgba(227, 227, 227);
  margin: 2rem auto;
  width: 80%;
  img {
    height: 200px;
  }
  div {
    margin-left: 2rem;
  }
`
const SearchWrapper = styled.div`
  background-image: url(https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80);
  padding: 20px;
  margin: 40px;
  height: 15rem;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    padding: 13px;
    width: 70%;
    border: 3px solid rgba(255, 202, 154);
    border-radius: 20px;
  }
  button {
    position: relative;
    right: 8%;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`
export default connect(mapStateToProps, mapDispatchToProps)(Home)

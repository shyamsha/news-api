import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Input, Card, Button, Spin } from "antd";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import { News } from "../types";

const { Meta } = Card;
const { Search } = Input;

interface Props {
  loading: boolean;
  news: News;
  searchQuery: (e: string) => void;
  search: string;
  pageNext: () => void;
  pagePrev: () => void;
  page: number;
}

export default function NewsFeed(props: Props) {
  let obj: any = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };

  let [like, setLike] = useState(0);
  let [id, setId] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const countLikes = (id: number) => {
    setId(id);
    setLike(like+1)
  };

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
     if(id===Number(key)){
       obj[id] = like;
     }
    }
  }

  const hideNews = (i:number) => {
    setId(i)
    setIsVisible(true);
  };

  const openNewInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  if (props.loading) {
    return <Center><Spin style={{top:"50%"}}/></Center>;
  }
  return (
    <Fragment>
      <FilterHeader>
        <CustomPagination>
          <span
            style={{
              paddingRight: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Total Result: {props.news !== null && props.news.totalResults}
          </span>
          <Space>
            <LeftSquareOutlined
              style={{
                fontSize: "32px",
                color: "#1890ff",
                cursor: props.page > 1 ? `pointer` : `not-allowed`,
              }}
              onClick={() => (props.page > 1 ? props.pagePrev() : null)}
            />
          </Space>
          <div>
            <RightSquareOutlined
              style={{
                fontSize: "32px",
                color: "#1890ff",
                cursor:
                  props.news !== null && props.news.totalResults > 0
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={() =>
                props.news !== null && props.news.totalResults > 10
                  ? props.pageNext()
                  : null
              }
            />
          </div>
        </CustomPagination>
        <div>
          <Search
            placeholder="search for news"
            enterButton
            onSearch={e => props.searchQuery(e)}
          />
        </div>
      </FilterHeader>
      <Container style={{}}>
        {props.news !== null &&
          props.news.articles.map((ele, i) => {
            return (
              <div style={{ padding: "8px 12px" }} key={i}>
                <Card
                  style={{ width: 300 }}
                  bodyStyle={{ height: "300px" }}
                  hoverable={true}
                  cover={
                    <img alt="media" src={ele.urlToImage} height="200px" />
                  }
                  actions={[
                    <Button type="link" onClick={()=>hideNews(i)}>
                      Hide
                    </Button>,
                    <Button type="link" onClick={() => countLikes(i)}>
                      <LikeTwoTone key="like" />
                      {/* {like} */}
                    </Button>,
                  ]}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => openNewInNewTab(ele.url)}
                  >
                    <Meta title={ele.title} description={ele.description} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "4px 0",
                      fontWeight: 700,
                      wordBreak: "break-word",
                    }}
                  >
                    {ele.author}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {ele.publishedAt}
                  </div>
                </Card>
              </div>
            );
          })}
      </Container>
    </Fragment>
  );
}

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap:wrap;
`;

const CustomPagination = styled.div`
  display: flex;
`;

const Space = styled.div`
  padding-right: 8px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: stretch;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  align-self: auto;
`;

import React, { Fragment } from "react";
import styled from "styled-components";
import { Input, Card, Button } from "antd";
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
  const openNewInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  if (props.loading) {
    return <Center>loading...</Center>;
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
                props.news !== null && props.news.totalResults > 0
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
              <div style={{ padding: "8px 12px" }}>
                <Card
                  style={{ width: 300 }}
                  bodyStyle={{ height: "300px" }}
                  hoverable={true}
                  cover={
                    <img alt="example" src={ele.urlToImage} height="200px" />
                  }
                  actions={[
                    <Button type="link">Hide</Button>,
                    <LikeTwoTone key="like" />,
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

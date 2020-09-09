import React, { Fragment } from "react";
import styled from "styled-components";
import { Input, Card, Button } from "antd";
import {
  LeftSquareOutlined,
  RightSquareOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { News } from "../types";

const { Meta } = Card;
const { Search } = Input;

interface Props {
  loading: boolean;
  news: News;
  searchQuery: (e: { target: { value: string } }) => void;
  search: string;
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
          <Space>
            <LeftSquareOutlined
              style={{ fontSize: "32px", color: "#1890ff", cursor: "pointer" }}
              onClick={() => null}
            />
          </Space>
          <div>
            <RightSquareOutlined
              style={{ fontSize: "32px", color: "#1890ff", cursor: "pointer" }}
              onClick={() => null}
            />
          </div>
        </CustomPagination>
        <div>
          <Search
            placeholder="search for news"
            enterButton
            onChange={e => props.searchQuery(e)}
          />
        </div>
      </FilterHeader>
      <div style={{ padding: "8px" }}>
        {props.news !== null &&
          props.news.articles.map((ele, i) => {
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => openNewInNewTab(ele.url)}
              >
                <Card
                  style={{ width: 300 }}
                  cover={<img alt="example" src={ele.urlToImage} />}
                  actions={[
                    <Button type="link">Hide</Button>,
                    <EditOutlined key="edit" />,
                  ]}
                >
                  <Meta title={ele.title} description={ele.description} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "4px 0",
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
      </div>
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

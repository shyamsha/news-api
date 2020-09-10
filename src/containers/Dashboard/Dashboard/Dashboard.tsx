import React, { Component, Fragment, Dispatch } from "react";
import { ApplicationState } from "../../../store";
import { connect } from "react-redux";
import { newsRequest, categoryRequest, newsSearchRequest } from "../actions";
import { News, NewsParams } from "../types";
import { Tabs } from "antd";
import {
  DollarCircleTwoTone,
  PlaySquareTwoTone,
  TabletTwoTone,
} from "@ant-design/icons";
import NewsFeed from "../views/NewsFeed";

const { TabPane } = Tabs;

interface PropsFromState {
  loading: boolean;
  news: News;
  category: string;
  errors: {
    news: string;
  };
}

interface PropsDispatchFromState {
  onNews: typeof newsRequest;
  onCategory: typeof categoryRequest;
  onNewsSearch: typeof newsSearchRequest;
}

type AllProps = PropsFromState & PropsDispatchFromState;

interface State {
  pageSize: number;
  page: number;
  category: string[];
  search: string;
  filter: any[];
}
class Dashboard extends Component<AllProps, State> {
  state: State = {
    pageSize: 10,
    page: 1,
    category: ["business", "sports", "entertainment"],
    search: "",
    filter: [],
  };

  paginationNext = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      if (this.state.search.length > 0) {
        const params: NewsParams = {
          pageSize: this.state.pageSize,
          page: this.state.page,
          category: this.props.category,
          q: this.state.search,
        };
        this.props.onNewsSearch(params);
      } else {
        const params: NewsParams = {
          pageSize: this.state.pageSize,
          page: this.state.page,
          category: this.props.category,
        };
        this.props.onNews(params);
      }
    });
  };

  paginationPrev = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      if (this.state.search.length > 0) {
        const params: NewsParams = {
          pageSize: this.state.pageSize,
          page: this.state.page,
          category: this.props.category,
          q: this.state.search,
        };
        this.props.onNewsSearch(params);
      } else {
        const params: NewsParams = {
          pageSize: this.state.pageSize,
          page: this.state.page,
          category: this.props.category,
        };
        this.props.onNews(params);
      }
    });
  };

  searchQuery = (e: string) => {
    this.setState({ search: e, page: 1, pageSize: 10 }, () => {
      const params: NewsParams = {
        pageSize: this.state.pageSize,
        page: this.state.page,
        category: this.props.category,
        q: e,
      };
      if (e.length > 0) {
        this.props.onNewsSearch(params);
      }
    });
  };

  businessNewsFeed = () => {
    const params: NewsParams = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      category: this.state.category[0],
    };
    this.props.onNews(params);
  };

  techNewsFeed = () => {
    const params: NewsParams = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      category: this.state.category[1],
    };
    this.props.onNews(params);
  };

  entertainmentNewsFeed = () => {
    const params: NewsParams = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      category: this.state.category[2],
    };
    this.props.onNews(params);
  };

  getNewsFeed = (activeKey: string) => {
    if (activeKey === "1") {
      this.setState({ page: 1, search: "" }, () => {
        this.props.onCategory({ category: "business" });
        this.businessNewsFeed();
      });
    } else if (activeKey === "2") {
      this.setState({ page: 1, search: "" }, () => {
        this.props.onCategory({ category: "sports" });
        this.techNewsFeed();
      });
    } else if (activeKey === "3") {
      this.setState({ page: 1, search: "" }, () => {
        this.props.onCategory({ category: "entertainment" });
        this.entertainmentNewsFeed();
      });
    }
  };

  componentDidMount() {
    const params: NewsParams = {
      pageSize: this.state.pageSize,
      page: this.state.page,
      category: this.state.category[0],
    };
    this.props.onCategory({ category: "business" });
    this.props.onNews(params);
  }

  render() {
    const { loading, news } = this.props;
    return (
      <Fragment>
        <div>
          <Tabs defaultActiveKey="1" onTabClick={this.getNewsFeed}>
            <TabPane
              tab={
                <span>
                  <DollarCircleTwoTone />
                  Business
                </span>
              }
              key="1"
            >
              <NewsFeed
                news={news}
                loading={loading}
                searchQuery={this.searchQuery}
                search={this.state.search}
                pageNext={this.paginationNext}
                pagePrev={this.paginationPrev}
                page={this.state.page}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <PlaySquareTwoTone />
                  Sports
                </span>
              }
              key="2"
            >
              <NewsFeed
                news={this.props.news}
                loading={this.props.loading}
                searchQuery={this.searchQuery}
                search={this.state.search}
                pageNext={this.paginationNext}
                pagePrev={this.paginationPrev}
                page={this.state.page}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TabletTwoTone />
                  Entertainment
                </span>
              }
              key="3"
            >
              <NewsFeed
                news={this.props.news}
                loading={this.props.loading}
                searchQuery={this.searchQuery}
                search={this.state.search}
                pageNext={this.paginationNext}
                pagePrev={this.paginationPrev}
                page={this.state.page}
              />
            </TabPane>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps: any = ({ news }: ApplicationState) => ({
  loading: news.loading,
  news: news.news,
  category: news.category,
  errors: news.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onNews: (params: NewsParams) => dispatch(newsRequest(params)),
  onCategory: (params: { category: string }) =>
    dispatch(categoryRequest(params)),
  onNewsSearch: (params: NewsParams) => dispatch(newsSearchRequest(params)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Dashboard);

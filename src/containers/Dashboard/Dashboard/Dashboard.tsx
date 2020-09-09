import React, { Component, Fragment, Dispatch } from "react";
import { ApplicationState } from "../../../store";
import { connect } from "react-redux";
import { newsRequest } from "../actions";
import { News, NewsParams } from "../types";
import { Tabs } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import NewsFeed from "../views/NewsFeed";

const { TabPane } = Tabs;

interface PropsFromState {
  loading: boolean;
  news: News;
  errors: {
    news: string;
  };
}

interface PropsDispatchFromState {
  onNews: typeof newsRequest;
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
    category: ["business", "technology", "entertainment"],
    search: "",
    filter: [],
  };

  paginationNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  paginationPrev = () => {
    this.setState({ page: this.state.page - 1 });
  };

  searchQuery = (e: { target: { value: string } }) => {
    this.setState({ search: e.target.value });
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
        this.businessNewsFeed();
      });
    } else if (activeKey === "2") {
      this.setState({ page: 1, search: "" }, () => {
        this.techNewsFeed();
      });
    } else if (activeKey === "3") {
      this.setState({ page: 1, search: "" }, () => {
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
                  <AppleOutlined />
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
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Technology
                </span>
              }
              key="2"
            >
              <NewsFeed
                news={this.props.news}
                loading={this.props.loading}
                searchQuery={this.searchQuery}
                search={this.state.search}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AppleOutlined />
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
  errors: news.errors,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onNews: (params: NewsParams) => dispatch(newsRequest(params)),
});

export default connect<any>(mapStateToProps, mapDispatchToProps)(Dashboard);

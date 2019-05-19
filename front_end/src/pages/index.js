import { Component } from 'react';
import { Layout, Input, Button } from 'antd';
import { MyTag } from './MyTag';
import { LineChart } from './LineChart';
import { MoneyDis } from './MoneyDis';
import { FormattedMessage, formatMessage, setLocale } from 'umi/locale';

const { Header, Content, Footer } = Layout;
const Search = Input.Search;
const EI_STOCKS = ['VEA', 'IEFA', 'EFA'];
const GI_STOCKS = ['QQQ', 'IWF', 'VUG'];
const II_STOCKS = ['SPY', 'IVV', 'VTI'];
const QI_STOCKS = ['QUAL', 'SPHQ', 'BFOR'];
const VI_STOCKS = ['FNDF', 'VLUE', 'SPYD'];

class App extends Component {

    state = {
      checkedTag: 0,
      tags: [],
      chartTags: [],
      data: [],
      stockWeights: [],
      invest: 0,
    }

    checkedTag = () => {
      return this.state.checkedTag;
    }

    setTag = (num, id) => {
      let curTags = this.state.checkedTag;
      if (curTags < 2 || num < 0) {
        this.setState({checkedTag: curTags + num});
        let tags = this.state.tags;
        if (num < 0) {
          tags.splice( tags.indexOf(id), 1 )
          this.setState({ tags: tags });
        } else {
          tags.push(id);
          this.setState({ tags: tags });
        }
      }
    }

    getCharts(invest) {
      if (isNaN(invest)) {
        alert('Please input a number'); 
      } else if (invest < 5000) {
        alert('The minimum investment value is 5000');
      } else {
        console.log('index getchart');
        let symbolList = this.getSymbols(this.state.tags);
        console.log('symbol list');
        console.log(symbolList);
        this.fetchData(symbolList);
        this.setState({invest: invest});
      }
    }

    getSymbols(strategies) {
      let symbolList = [];
      strategies.forEach(strategy => {
          // console.log(strategy);
          switch(strategy) {
              case 'ei': symbolList = symbolList.concat(EI_STOCKS);break;
              case 'gi': symbolList = symbolList.concat(GI_STOCKS); break;
              case 'ii': symbolList = symbolList.concat(II_STOCKS); break;
              case 'qi': symbolList = symbolList.concat(QI_STOCKS); break;
              case 'vi': symbolList = symbolList.concat(VI_STOCKS); break;
              default: break;
          }
      });
      return symbolList;
  }

  fetchData(symbolList) {
    const data = [];
    const weights = {};
    const stockWeights = [];
    let total_price = 0;
    let target = symbolList.length;
    symbolList.forEach(symbol => {
        let url = 'http://127.0.0.1:5000/stockprice?symbol=' + symbol;
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                const dataset = [];
                let stock_price = 0;
                result.prices.forEach(row => {
                    dataset.push({
                        time: row.time,
                        value: parseFloat(row.stock_price)
                    });
                    stock_price += parseFloat(row.stock_price);
                });
                weights[symbol] = stock_price;
                total_price += stock_price;
                data.push({'name': symbol, 'dataset': dataset});
                console.log(data);
                // calculate weight here

                if (data.length === target) {
                  symbolList.forEach(symbol => {
                    weights[symbol] = weights[symbol] / total_price;
                    stockWeights.push({
                      name: symbol,
                      weight: weights[symbol],
                    });
                  });
                  console.log(stockWeights);
                  this.setState({data: data , stockWeights: stockWeights});
                }

              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              })
                  
          });
      }

      changeLang(lang) {
        console.log(lang.target.id);
        setLocale(lang.target.id);
      }
    

    render() {
      // const style = {
      //   'margin': '0 20px',
      // };
      const getChartFunc = this.getCharts.bind(this);
      console.log(this.state.chartTags);
      return (
        <Layout className="layout" style={{'height': '100vh'}}>
          <Header>
            <h1 style={{'color': 'white', 'fontStyle': 'italic'}}>
              <FormattedMessage id="app.main.title" defaultMessage="Stock Portfolio Suggestion Engine" />
            </h1>
            <div style={{'position': 'relative', 'color': 'white', 'float': 'right', 'top': '-73px'}}>
              <Button ghost id='en-US' onClick={value => this.changeLang(value)} style={{'marginRight': 10}}>
                English
              </Button>
              <Button ghost id='zh-CN' onClick={value => this.changeLang(value)}>
                中文
              </Button>
            </div>
          </Header>
          <Content style={{ padding: '0 50px', minHeight: '500px' }}>   
            <div style={{ background: '#fff', padding: 24}}>
              <div>
                <MyTag checkedtag={this.checkedTag.bind(this)}
                       settag={this.setTag.bind(this)}
                       tag='ei'> 
                       <FormattedMessage id="app.main.ei" defaultMessage="Ethical Investing" />
                </MyTag>  
                <MyTag checkedtag={this.checkedTag.bind(this)}
                       settag={this.setTag.bind(this)}
                       tag='gi'> 
                       <FormattedMessage id="app.main.gi" defaultMessage="Growth Investing" />
                </MyTag> 
                <MyTag checkedtag={this.checkedTag.bind(this)}
                       settag={this.setTag.bind(this)}
                       tag='ii'> 
                       <FormattedMessage id="app.main.ii" defaultMessage="Index Investing" />
                </MyTag> 
                <MyTag checkedtag={this.checkedTag.bind(this)}
                       settag={this.setTag.bind(this)}
                       tag='qi'> 
                       <FormattedMessage id="app.main.qi" defaultMessage="Quality Investing" />
                </MyTag> 
                <MyTag checkedtag={this.checkedTag.bind(this)}
                       settag={this.setTag.bind(this)}
                       tag='vi'> 
                       <FormattedMessage id="app.main.vi" defaultMessage="Value Investing" />
                </MyTag> 
              </div> 
              <div>
                <Search
                  placeholder={formatMessage({ id: 'app.main.hint' })}
                  onSearch={ value => getChartFunc(value)}
                  enterButton
                  style={{'marginTop': '20px', 'width': '680px'}}
                />
              </div>
              <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                <LineChart data={this.state.data} />  
                <MoneyDis stockWeights={this.state.stockWeights} invest={this.state.invest} />
              </div>
              
            </div>
          </Content>
        
          <Footer style={{ textAlign: 'center' }}>
            <FormattedMessage id="app.main.footer" defaultMessage="CMPE285 Team Project" />
          </Footer>
        </Layout>
    );
  }
}

export default App;
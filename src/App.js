import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ModalOld from "./components/Portal/Old";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import TriggerModal from "./components/Portal/Trigger";
import PropsHell from "./components/Context/PropsHell";
import ContextExample from "./components/Context/ContextExample";
import ColorTitle from "./components/Hooks/ColorTitle";

function App() {

  const [oldModalType, setOldModalType] = useState('');

  console.log(oldModalType)
  return (
    <div className="App">
      {oldModalType && <ModalOld close={() => setOldModalType('')} type={oldModalType}/>}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Why bother upgrading to React 16.8.x?
        </p>
      </header>
      <div className={'page'}>
        <h1>Portals</h1>
        <p>
          <strong>The problem:</strong> we need to trigger a full screen modal from within a component.
        </p>
        <div className={'block'}>
          <h1>The old way 💩</h1>
          <button onClick={() => setOldModalType('A')}>Show A</button>
          <button onClick={() => setOldModalType('B')}>Show B</button>
          <SyntaxHighlighter language='javascript' style={dark}>{`
        import React from "react";
        import './style.css';

        const ModalOld = (props) => (
          <div className={'overlay'}>
            <div className={'content'}>
              {
                props.type === 'A' ?
                  <div>Content of Modal A</div>
                  :
                  props.type === 'B' ?
                    <div>Content of Modal B</div>
                    :
                    null
              }
              <button onClick={() => props.close()}>close</button>
            </div>
          </div>
        );

        export default ModalOld;
        `}</SyntaxHighlighter>
        </div>
        <div className={'block'}>
          <h1>The new way 🥳</h1>
          <TriggerModal/>
          <SyntaxHighlighter language='javascript' style={dark}>{`
          import React, {useState} from 'react';
          import ModalNew from "./New";

          const TriggerModal = () => {
            const [ show, toggle ] = useState(false);

            return (
              <div>
                {
                  show && <ModalNew>Hello!!! <button onClick={() => toggle(false)}>close</button></ModalNew>
                }
                <button onClick={() => toggle(true)}>Show</button>
              </div>
            );
          };

          export default TriggerModal;
          `}</SyntaxHighlighter>
        </div>
      </div>
      <div className={'page'}>
        <h1>Context</h1>
        <h1>The old way 💩</h1>
        <PropsHell name={'Insights teem'} />
        <div className={'block'}>
          <SyntaxHighlighter language='javascript' style={dark}>{`
            import React from 'react';

            const D = (props) => <div>Hey {props.name} 👋</div>;
            const C = (props) => <div><D name={props.name}/></div>;
            const B = (props) => <div><C name={props.name}/></div>;
            const A = (props) => <div><B name={props.name}/></div>;
            const PropsHell = (props) => <A name={props.name}/>;

            export default PropsHell;
          `}</SyntaxHighlighter>
        </div>
        <h1>The new way 🥳</h1>
        <ContextExample name={'Insights teem'} />
        <div className={'block'}>
          <SyntaxHighlighter language='javascript' style={dark}>{`
          import React, {useContext} from "react";

          const NameContext = React.createContext('');

          const D1 = () => {
            const name = useContext(NameContext);

            return (
              <div>Hey {name} 👋</div>
            );
          };

          const D2 = () => (
            <div>
              <NameContext.Consumer>
                {name => <span>Hey {name} 👋</span>}
              </NameContext.Consumer>
            </div>
          );


          const C = () => <div><D1 /> <D2 /></div>;
          const B = () => <div><C /></div>;
          const A = () => <div><B /></div>;

          const ContextExample = (props) => (
            <NameContext.Provider value={props.name}>
              <A />
            </NameContext.Provider>
          );

          export default ContextExample;
          `}</SyntaxHighlighter>
        </div>
      </div>
      <div className={'page'}>
        <h1>And of course...hooks</h1>
        <ColorTitle title={'INSIGHTS TEAM'}/>

        <div className={'block'}>
          <h1>HOC</h1>
          <SyntaxHighlighter language='javascript' style={dark}>{`
          import React from "react";
          import {getRandomInt} from "./random";

          const withChangingColor = (Component) => {

            class Wrapped extends React.Component {
              state = {
                R: 0,
                G: 0,
                B: 0,
              };

              componentDidMount() {
                this.interval = setInterval(() => {
                  this.setState({
                    R: getRandomInt(0, 255),
                    G: getRandomInt(0, 255),
                    B: getRandomInt(0, 255),
                  })
                }, 1500);
              }

              componentWillMount() {
                clearInterval(this.interval);
              }

              render() {
                const { R,G,B } = this.state;
                return <Component {...this.props} color={"rgb(\${R},\${G},\${B})"} />
              }
            }

            return Wrapped;
          };

          export default withChangingColor;


          /* Usage */

          import withChangingColor from "./HOC";
          import React from "react";
          import './style.css';

          const A = ({color, title}) => <h1 className={'title'} style={{color}}>{title}</h1>;

          export default withChangingColor(A);
          `}
          </SyntaxHighlighter>
        </div>

        <div className={'block'}>
          <h1>Render Props</h1>
          <SyntaxHighlighter language='javascript' style={dark}>{`
          import React from "react";
          import {getRandomInt} from "./random";

          class ChangingColor extends React.Component {
            state = {
              R: 0,
              G: 0,
              B: 0,
            };

            componentDidMount() {
              this.interval = setInterval(() => {
                this.setState({
                  R: getRandomInt(0, 255),
                  G: getRandomInt(0, 255),
                  B: getRandomInt(0, 255),
                })
              }, 1500);
            }

            componentWillMount() {
              clearInterval(this.interval);
            }

            render() {
              const { R,G,B } = this.state;
              return this.props.render(\`rgb(\${R},\${G},\${B})\`);
            }
          }

          export default ChangingColor;

          /* Usage */

          import withChangingColor from "./HOC";
          import React from "react";
          import './style.css';
          import ChangingColor from "./RenderProps";

          const B = ({color, title}) => <ChangingColor render={(color) => (
              <h1 className={'title'} style={{color}}>{title}</h1>
            )}/>
          ;

          export default B;
          `}
          </SyntaxHighlighter>
        </div>

        <div className={'block'}>
          <h1>Custom hook</h1>
          <SyntaxHighlighter language='javascript' style={dark}>{`
          import {useState, useEffect} from 'react';
          import {getRandomInt} from "./random";

          const useChangingColor = () => {
            const [ color, setColor ] = useState([0,0,0]);

            useEffect(() => {
              const interval = setInterval(() => {
                setColor([
                  getRandomInt(0, 250),
                  getRandomInt(0, 250),
                  getRandomInt(0, 250),
                ])
              }, 1500);

              return () => clearInterval(interval);
            }, [color])

            return \`rgb(\${color.join()})\`;
          };

          export default useChangingColor;

          /* Usage */

          import useChangingColor from "./useChangingColor";
          import './style.css';
          import React from "react";

          const C = (props) => {
            const color = useChangingColor();

            return <h1 className={'title'} style={{ color }}>{props.title}</h1>;
          };

          export default C;
          `}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default App;

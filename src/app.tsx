import React from 'react';
import './app.css';
import Dashboard from "./Dashboard/component";
import Navigation from "./Navigation/component";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NotFound from "./404";
import TeamPage from "./Team/component";
import TeamList from "./Team/list";
import MatchPage from "./Match/component";
import menu from "./ContextMenu/manager";

class App extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            menus: null
        }
    }

    componentDidMount() {
        menu.connect((menuContent: JSX.Element[]|undefined) => {
            this.setState({
                menus: menuContent
            });
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="w3-container">
                    <Navigation/>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path='*' element={ <NotFound/> }/>
                            <Route path="/teams" element={ <TeamList /> }></Route>
                            <Route path="/team/:id" element={ <TeamPage /> }></Route>
                            <Route path="/match/:id" element={ <MatchPage /> }></Route>
                        </Routes>
                        <div id="menu-overlay">
                            { this.state.menus }
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

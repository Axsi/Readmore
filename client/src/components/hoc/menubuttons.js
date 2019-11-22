import React from 'react';

/*A Higher Order Component used for making access to menu functions all in one spot */
function menuButtons(Component){
    return class MenuButtons extends React.Component{
        _isMounted = false;
        constructor(props){
            super(props);
            this.state = {
                menuVisible: false
            };
            this.showMenu = this.showMenu.bind(this);
            this.hideMenu = this.hideMenu.bind(this);
        }
        showMenu(event){
            event.preventDefault();
            this._isMounted = true;
            this.setState({menuVisible: true}, ()=>{
                document.addEventListener('click', this.hideMenu);
            });
        }

        hideMenu(boolean){
            if(this._isMounted){
                this.setState({menuVisible: boolean}, ()=>{
                    document.removeEventListener('click', this.hideMenu);
                });
            }
        }
        //componentWillUnMount will make sure the eventListener is removed and that isMounted will be set to false
        componentWillUnmount() {
            this._isMounted = false;
            console.log("componentUnmount");
            document.removeEventListener('click', this.hideMenu)
        }

        render(){
            const props = {
                showMenu: this.showMenu,
                hideMenu: this.hideMenu,

            };
            return(
                <Component menuVisible={this.state.menuVisible} {...props}/>
            )
        }
    }
}

export default menuButtons
import * as React from 'react';
import styles from './HelloTeams.module.scss';
import { IHelloTeamsProps } from './IHelloTeamsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class HelloTeams extends React.Component<IHelloTeamsProps, {}> {
  public render(): React.ReactElement<IHelloTeamsProps> {
    return (
      <div className={ styles.helloTeams }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

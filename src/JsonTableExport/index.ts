import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {IInputs, IOutputs} from './generated/ManifestTypes';
import { ExportComponent } from './grid';

export class JsonTableExport implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    jsonData: string|null = null;
    container: HTMLDivElement;

    constructor()
    {
        //do nothing
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.jsonData = context.parameters.Data.raw;
        this.container = container;
        
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement
    {
        // Add code to update control view

        this.jsonData = context.parameters.Data.raw;

        return React.createElement(ExportComponent, {
            data: this.jsonData!
            
        });

        // this.root = ReactDOM.createRoot(this.container);
        // this.root.render(
        //     React.createElement(ExportComponent, {
        //         data: this.jsonData!
                
        //     })
        // );

        // ReactDOM.render(
        //     React.createElement(ExportComponent, {
        //         data: this.jsonData!
                
        //     }),
        //     this.container
        // );
    }

    public getOutputs(): IOutputs
    {
        return {};
    }

    public destroy(): void
    {
        //this.root.unmount
        //ReactDOM .unmountComponentAtNode(this.container);
        
    }
}

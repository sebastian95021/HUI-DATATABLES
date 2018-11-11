import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";

class MuiTable extends Component {
    render() {

        const columns = ["Name", "Company", "City", "State"];

        const data = [
         ["Joe James", "Test Corp", "Yonkers", ["A","B"] ],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["James Houston", "Test Corp", "Dallas", "TX"],
         ["Joe James", "Test Corp", "Yonkers", "NY"],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["James Houston", "Test Corp", "Dallas", "TX"],
         ["Joe James", "Test Corp", "Yonkers", "NY"],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["James Houston", "Test Corp", "Dallas", "TX"],
         ["Joe James", "Test Corp", "Yonkers", "NY"],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["James Houston", "Test Corp", "Dallas", "TX"],
         ["Joe James", "Test Corp", "Yonkers", "NY"],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["James Houston", "Test Corp", "Dallas", "TX"],
         ["Joe James", "Test Corp", "Yonkers", "NY"],
         ["John Walsh", "Test Corp", "Hartford", "CT"],
         ["Bob Herm", "Test Corp", "Tampa", "FL"],
         ["12", "Test Corp", "Dallas", "TX"]
        ];
        
        const options = {
          filterType: 'checkbox',
        };

        return (
            <MUIDataTable 
                title={"Employee List"} 
                data={data} 
                columns={columns} 
                options={options} 
            />
        );
    }
}

export default MuiTable;
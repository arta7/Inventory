import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './../SForm.styles';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { Select, Option } from '@app/components/common/selects/Select/Select';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { categoriesList, CategoryType } from '@app/constants/categoriesList';
import { SearchDropdown } from '@app/components/header/components/searchDropdown/SearchDropdown';
import { components as configComponents, Component } from '@app/constants/config/components';
import { Btn, InputSearch } from '@app/components/header/components/HeaderSearch/HeaderSearch.styles';
import { Calendar, DatePicker } from 'react-persian-datepicker';
// import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
interface DefinePostData {
  Title: string;
  Code: string;
}

export interface CategoryComponents {
    category: CategoryType;
    components: Component[];
  }

 const SetProduce: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [date, setDate] = useState(null);
  const [components] = useState<Component[]>(configComponents);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const sortedResults = query
    ? categoriesList.reduce((acc, current) => {
        const searchResults = components.filter(
          (component) =>
            component.categories.includes(current.name) &&
            component.keywords.some((keyword) => keyword.includes(query)),
        );

        return searchResults.length > 0 ? acc.concat({ category: current.name, components: searchResults }) : acc;
      }, [] as CategoryComponents[])
    : null;

  const { t } = useTranslation();

  const handleSubmit = (values: DefinePostData) => {
  };

  return (
    <div >
    <div style={{
    //   display: 'flex',
      // flexDirection:'row'
      // ,justifyContent:'space-between'
      // ,width:'100%'
    }}>
       <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit}  >
        <S.Title>سند انبار</S.Title>
       

        
        <BaseButtonsForm.Item name="DocumentType" label="نوع سند"
           rules={[{ required: true}]}
        >
      <Select>
        <Option value="1">
          <Space align="center">
            {/* <ManOutlined /> */}
        خرید
          </Space>
        </Option>
        <Option value="2">
          <Space align="center">
            {/* <WomanOutlined /> */}
            مصرف
          </Space>
        </Option>
        <Option value="3">
          <Space align="center">
            {/* <WomanOutlined /> */}
            ضایعات
          </Space>
        </Option>
      </Select>
    </BaseButtonsForm.Item>



    <BaseButtonsForm.Item name="DocumentType" label="درخواست کننده"
           rules={[{ required: true}]}
        >
      <Select>
        <Option value="1">
          <Space align="center">
            {/* <ManOutlined /> */}
        رادیولوژی
          </Space>
        </Option>
        <Option value="2">
          <Space align="center">
            {/* <WomanOutlined /> */}
            مغز و اعصاب
          </Space>
        </Option>
        <Option value="3">
          <Space align="center">
            {/* <WomanOutlined /> */}
            اورتوپد
          </Space>
        </Option>
      </Select>
    </BaseButtonsForm.Item>
     
        
  <div style={{width:500,height:100}}>
    <DatePicker
        value={date}
        onChange={(v) => setDate(v)}
        style={{}}
      />
    
    </div>
     
  
       
      
        <BaseForm.Item noStyle>

        
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
           ثبت
          </Auth.SubmitButton>
        </BaseForm.Item>
 
      </BaseForm>
   
   </Auth.FormWrapper>
    </div>
    {/* <Tables /> */}
    </div>
  );
};

export default SetProduce;

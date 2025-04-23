/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { joditConfig } from '@/config';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface CraftEditorProps {
  name: string;
  label?: string;
}

const CraftEditor: React.FC<CraftEditorProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const editorRef = useRef<any>(null); 

  const config = {
    ...joditConfig,
    uploader: {
      ...joditConfig.uploader,
      defaultHandlerSuccess(this: any, response: any) {
        if (response.files && response.files.length) {
          const imageUrl = response.files[0];
          this.selection.insertImage(imageUrl, null, 250);
        }
      },
    },
  };
  

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <div>
          {label && <label>{label}</label>}
          <JoditEditor
            ref={editorRef}
            value={value}
            config={config}
            onBlur={(newContent) => {
              onBlur();
              onChange(newContent);
            }}
            onChange={() => {}}
          />
        </div>
      )}
    />
  );
};

export default CraftEditor;

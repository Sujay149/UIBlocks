import * as SampleComponents from "./SampleComponents";

interface DynamicPreviewProps {
  code: string;
  previewName: string;
}

export const DynamicPreview = ({ code, previewName }: DynamicPreviewProps) => {
  // Try to get the component from SampleComponents
  const Component = (SampleComponents as any)[previewName];
  
  if (Component) {
    return <Component />;
  }
  
  // Fallback: Try to dynamically evaluate the code
  try {
    // Create a function that returns the component
    const componentFunction = new Function(
      'React',
      `
      ${code}
      return ${previewName};
      `
    );
    
    const DynamicComponent = componentFunction(require('react'));
    return <DynamicComponent />;
  } catch (error) {
    console.error('Error rendering preview:', error);
    // Fallback UI
    return (
      <div className="w-full h-32 rounded-lg glass flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Preview</div>
          <div className="text-sm font-medium text-foreground">{previewName}</div>
        </div>
      </div>
    );
  }
};

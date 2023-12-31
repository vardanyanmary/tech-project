import { useState } from "react";
import cls from "./Main.module.scss";
import { RightSection } from "./RightSection/RightSection";
import { CentralSection } from "./CentralSections/CentralSections";
import { LeftSection } from "./LeftSection/LeftSection";
import { SelectedFolder } from "../../constants/selectedFolder";
import { SelectedFolderItem } from "../../constants/selectedFolderItem";

export const Main = () => {
  const [selectedFolder, setSelectedFolder] = useState<SelectedFolder | null>( null );
  const [selectedFolderItem, setSelectedFolderItem] = useState<SelectedFolderItem | null>(null);
  const [isPrivateMode, setIsPrivateMode] = useState<boolean>(false);

  const handleFolderClick = (folder: SelectedFolder) => {
    setSelectedFolderItem(null);
    setSelectedFolder(folder);
  };
  const handleModeChange = () => {
    setIsPrivateMode(!isPrivateMode);
  };

  return (
    <>
      <button onClick={handleModeChange} className={cls.switch}>
        {isPrivateMode ? "Switch to Public" : "Switch to Private"}
      </button>
    <div className={cls.Main}>
      {isPrivateMode && (
        <>
          <LeftSection onFolderClick={handleFolderClick} />
          <CentralSection
            selectedFolder={selectedFolder}
            mainFolderPassword={(folder: SelectedFolderItem) =>
              setSelectedFolderItem(folder)
            }
          />
          <RightSection
            selectedFolder={selectedFolder}
            selectedFolderItem={selectedFolderItem}
          />
        </>
      )}
      {!isPrivateMode && <LeftSection onFolderClick={handleFolderClick} />}
    </div>
    </>
  );
};

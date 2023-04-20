
export default class InventoryData {
    scene_name; char_info;

    page_number;

    has_page(i){
        return this.char_info.has_page(i);
    }
}
/**
 * Metadata container for storing VO and DO class attributes and providing discovery methods for invocation.
 */
export class MetadataContainer {
  /**
   * A metadata container with map structure for storing the class's related characteristics.
   */
  private static readonly container: Map<string, string[]> = new Map();
  /**
   * Provide the class's base name and the name of a class attribute that will be used to register the class and attribute name in the container.
   *
   * @param targetName the base name of class
   * @param propertyName the name of a class attribute
   *
   * @returns void
   *
   * @publicApi
   */
  public static registry(targetName: string, propertyName: any) {
    if (targetName && propertyName) {
      const record = MetadataContainer.container.get(targetName);

      if (record) {
        if (!record.includes(propertyName)) {
          record.push(propertyName);
          MetadataContainer.container.set(targetName, record);
        }
      } else {
        MetadataContainer.container.set(targetName, [propertyName]);
      }
    }
  }
  /**
   * Provide the class's base name and the name of a class attribute that will be used to register the class and attribute name in the container.
   *
   * @param targetName the base name of class
   *
   * @returns any[] the name of a class attribute
   *
   * @publicApi
   */
  public static discovery(targetName: string) {
    if (targetName) {
      const items = MetadataContainer.container.get(targetName);
      return items && items.length > 0 ? items : [];
    }
  }
}

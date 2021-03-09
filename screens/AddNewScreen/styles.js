import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  file: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
  },
  selectfiletext: {
    lineHeight: 30,
    marginLeft: 5,
  },
  memename: {
    marginBottom: 10,
  },
  icon: {
    marginLeft: 5,
    backgroundColor: 'gray',
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
export default styles;

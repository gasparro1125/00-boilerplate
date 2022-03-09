import * as viewModel from './project.vm'
import * as mapper from './project.mapper'

/*mock datas
//ApiModel have the same names properties to viewModel
{
  id: '485',
  name: 'mockProject',
  externalId: '',
  comments: '',
  isActive: true,
  employees:[]
}

*/

describe('pods/project/project.mapper spec',()=>{
  describe('should pass when we pass a project undefine or null',()=>{
    it('should return empty when we pass a undefine project',()=>{

      //Arrange
      const project = undefined
      const defaultValueProject = viewModel.createEmptyProject()

      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(defaultValueProject)
    })
    it('should return empty when we pass a null project',()=>{

      //Arrange
      const project = null
      const defaultValueProject = viewModel.createEmptyProject()

      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(defaultValueProject)
    })
  })

  describe('should pass when we pass a list of members of project empty, undefine or null',()=>{
    it('should return empty when we pass a empty list of members',()=>{
      //Arrange
      const project =  {
        id: '485',
        name: 'mockProject',
        externalId: '',
        comments: '',
        isActive: true,
        employees: []
      }

      const expectedValuePrjoect = {
        id: "485",
        name: "mockProject",
        externalId: '',
        comments: '',
        isActive: true,
        employees: []
      }

      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(expectedValuePrjoect)
    })


    it('should return empty when we pass a undefine list of members',()=>{
      //Arrange
      const project =  {
        id: '485',
        name: 'mockProject',
        externalId: '',
        comments: '',
        isActive: true,
        employees: undefined
      }

      const expectedValuePrjoect = {
        id: "485",
        name: "mockProject",
        externalId: '',
        comments: '',
        isActive: true,
        employees: []
      }

      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(expectedValuePrjoect)
    })

    it('should return empty when we pass a null project list of members',()=>{

      //Arrange
      const project =  {
        id: '485',
        name: 'mockProject',
        externalId: '',
        comments: '',
        isActive: true,
        employees: null
      }

      const expectedValuePrjoect = {
        id: "485",
        name: "mockProject",
        externalId: '',
        comments: '',
        isActive: true,
        employees: []
      }
      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(expectedValuePrjoect)
    })
  })

  describe("should pass when we pass a project with  a member list",()=>{
    it("should retunr a project with a list of member when we get a project with members",()=>{
      //Arrange
      const project =  {
        id: '485',
        name: 'mockProject',
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }

      const expectedValuePrjoect = {
        id: "485",
        name: "mockProject",
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }
      //Act
      const result =mapper.mapProjectFromApiToVm(project)

      //Assert
      expect(result).toEqual(expectedValuePrjoect)
    })
  })

  describe("should pass when we pass a project uncompleted with a member list",()=>{
    it("should return a project with his list of member when we get a project with members",()=>{
      //Arrange
      const projectNull =  {
        id: '485',
        name: null,
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }

      const projectUndefined =  {
        id: '485',
        name: undefined,
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }

      const expectedValuePrjoectWithNull = {
        id: "485",
        name: null,
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }

      const expectedValuePrjoectWithUndefined = {
        id: "485",
        name: undefined,
        externalId: '',
        comments: '',
        isActive: true,
        employees: [{
          id: "1",
          isAssigned: true,
          employeeName: "alberto"
        },
        {
          id: "2",
          isAssigned: true,
          employeeName: "Guillermo"
        }]
      }
      //Act
      const resultNull =mapper.mapProjectFromApiToVm(projectNull)
      const resultUndefined =mapper.mapProjectFromApiToVm(projectUndefined)

      //Assert
      expect(resultNull).toEqual(expectedValuePrjoectWithNull)
      expect(resultUndefined).toEqual(expectedValuePrjoectWithUndefined)
    })
  })
})

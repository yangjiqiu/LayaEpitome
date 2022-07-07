import Material = Laya.Material;
import Shader3D = Laya.Shader3D;
import SubShader = Laya.SubShader;
import VertexMesh = Laya.VertexMesh;
import BaseTexture = Laya.BaseTexture;
import Vector4 = Laya.Vector4;

export class GlassRefractionMaterial extends Laya.Material{
       static BUMPTEXTURE= Shader3D.propertyNameToID('u_BumpTexture');
       static DISTORTION= Shader3D.propertyNameToID('u_Distortion');
       static REFRACTIONTEXELSZIE= Shader3D.propertyNameToID('u_RefractionTex_TexelSize');
       static REFRACTAMOUNT= Shader3D.propertyNameToID('u_RefractAmount');
       static MAINTEXTURE= Shader3D.propertyNameToID('u_MainTexture');
       static CUBETEXTURE= Shader3D.propertyNameToID('u_CubeTexture');
       static initShader(){
        var attributeMap = {
            'a_Position': VertexMesh.MESH_POSITION0,
			'a_Color': VertexMesh.MESH_COLOR0,
			'a_Normal': VertexMesh.MESH_NORMAL0,
			'a_Texcoord0': VertexMesh.MESH_TEXTURECOORDINATE0,
			'a_Texcoord1': VertexMesh.MESH_TEXTURECOORDINATE1,
			'a_BoneWeights': VertexMesh.MESH_BLENDWEIGHT0,
			'a_BoneIndices': VertexMesh.MESH_BLENDINDICES0,
			'a_Tangent0': VertexMesh.MESH_TANGENT0,
			'a_WorldMat': VertexMesh.MESH_WORLDMATRIX_ROW0,
			'a_SimpleTextureParams':VertexMesh.MESH_SIMPLEANIMATOR
        }
        var uniformMap = {
            'u_Bones': Shader3D.PERIOD_CUSTOM,
			'u_DiffuseTexture': Shader3D.PERIOD_MATERIAL,
			'u_SpecularTexture': Shader3D.PERIOD_MATERIAL,
			'u_NormalTexture': Shader3D.PERIOD_MATERIAL,
			'u_AlphaTestValue': Shader3D.PERIOD_MATERIAL,
			'u_DiffuseColor': Shader3D.PERIOD_MATERIAL,
			'u_AlbedoIntensity': Shader3D.PERIOD_MATERIAL,
			'u_MaterialSpecular': Shader3D.PERIOD_MATERIAL,
			'u_Shininess': Shader3D.PERIOD_MATERIAL,
			'u_TilingOffset': Shader3D.PERIOD_MATERIAL,
			'u_TransmissionRate':Shader3D.PERIOD_MATERIAL,
			'u_BackDiffuse':Shader3D.PERIOD_MATERIAL,
			'u_BackScale':Shader3D.PERIOD_MATERIAL,
			'u_ThinknessTexture':Shader3D.PERIOD_MATERIAL,
			'u_TransmissionColor':Shader3D.PERIOD_MATERIAL,
			'u_WorldMat': Shader3D.PERIOD_SPRITE,
			'u_MvpMatrix': Shader3D.PERIOD_SPRITE,
			'u_LightmapScaleOffset': Shader3D.PERIOD_SPRITE,
			'u_LightMap': Shader3D.PERIOD_SPRITE,
			'u_LightMapDirection': Shader3D.PERIOD_SPRITE,
			'u_SimpleAnimatorTexture':Shader3D.PERIOD_SPRITE,
			'u_SimpleAnimatorParams':Shader3D.PERIOD_SPRITE,
			'u_SimpleAnimatorTextureSize':Shader3D.PERIOD_SPRITE,
			'u_CameraPos': Shader3D.PERIOD_CAMERA,
			'u_Viewport': Shader3D.PERIOD_CAMERA,
			'u_ProjectionParams': Shader3D.PERIOD_CAMERA,
			'u_View': Shader3D.PERIOD_CAMERA,
			'u_ViewProjection': Shader3D.PERIOD_CAMERA,
            // 屏幕采样/逐相机
            'u_cameraOpaqueTexture': Shader3D.PERIOD_CAMERA,
			'u_ReflectTexture': Shader3D.PERIOD_SCENE,
			'u_FogStart': Shader3D.PERIOD_SCENE,
			'u_FogRange': Shader3D.PERIOD_SCENE,
			'u_FogColor': Shader3D.PERIOD_SCENE,
			'u_DirationLightCount': Shader3D.PERIOD_SCENE,
			'u_LightBuffer': Shader3D.PERIOD_SCENE,
			'u_LightClusterBuffer': Shader3D.PERIOD_SCENE,
			'u_AmbientColor': Shader3D.PERIOD_SCENE,
			'u_ShadowBias': Shader3D.PERIOD_SCENE,
			'u_ShadowLightDirection': Shader3D.PERIOD_SCENE,
			'u_ShadowMap': Shader3D.PERIOD_SCENE,
			'u_ShadowParams': Shader3D.PERIOD_SCENE,
			'u_ShadowSplitSpheres': Shader3D.PERIOD_SCENE,
			'u_ShadowMatrices': Shader3D.PERIOD_SCENE,
			'u_ShadowMapSize': Shader3D.PERIOD_SCENE,
			'u_SpotShadowMap':Shader3D.PERIOD_SCENE,
			'u_SpotViewProjectMatrix':Shader3D.PERIOD_SCENE,
			'u_ShadowLightPosition':Shader3D.PERIOD_SCENE,
			//GI
			'u_AmbientSHAr': Shader3D.PERIOD_SCENE,
			'u_AmbientSHAg': Shader3D.PERIOD_SCENE,
			'u_AmbientSHAb': Shader3D.PERIOD_SCENE,
			'u_AmbientSHBr': Shader3D.PERIOD_SCENE,
			'u_AmbientSHBg': Shader3D.PERIOD_SCENE,
			'u_AmbientSHBb': Shader3D.PERIOD_SCENE,
			'u_AmbientSHC': Shader3D.PERIOD_SCENE,
			//legacy lighting
			'u_DirectionLight.color': Shader3D.PERIOD_SCENE,
			'u_DirectionLight.direction': Shader3D.PERIOD_SCENE,
			'u_PointLight.position': Shader3D.PERIOD_SCENE,
			'u_PointLight.range': Shader3D.PERIOD_SCENE,
			'u_PointLight.color': Shader3D.PERIOD_SCENE,
			'u_SpotLight.position': Shader3D.PERIOD_SCENE,
			'u_SpotLight.direction': Shader3D.PERIOD_SCENE,
			'u_SpotLight.range': Shader3D.PERIOD_SCENE,
			'u_SpotLight.spot': Shader3D.PERIOD_SCENE,
			'u_SpotLight.color': Shader3D.PERIOD_SCENE,
            'u_Distortion':Shader3D.PERIOD_MATERIAL,
            'u_BumpTexture':Shader3D.PERIOD_MATERIAL,
            'u_RefractionTex_TexelSize':Shader3D.PERIOD_MATERIAL,
            'u_RefractAmount':Shader3D.PERIOD_MATERIAL,
            'u_MainTexture':Shader3D.PERIOD_MATERIAL,
            'u_CubeTexture':Shader3D.PERIOD_MATERIAL
        }
        var stateMap = {
            's_Cull': Shader3D.RENDER_STATE_CULL,
			's_Blend': Shader3D.RENDER_STATE_BLEND,
			's_BlendSrc': Shader3D.RENDER_STATE_BLEND_SRC,
			's_BlendDst': Shader3D.RENDER_STATE_BLEND_DST,
			's_DepthTest': Shader3D.RENDER_STATE_DEPTH_TEST,
			's_DepthWrite': Shader3D.RENDER_STATE_DEPTH_WRITE,
			's_StencilTest':Shader3D.RENDER_STATE_STENCIL_TEST,
			's_StencilWrite':Shader3D.RENDER_STATE_STENCIL_WRITE,
			's_StencilRef':Shader3D.RENDER_STATE_STENCIL_REF,
			's_StencilOp':Shader3D.RENDER_STATE_STENCIL_OP
        }
        var shader = Shader3D.add("GLASSREFRACTIONSHADER");
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass("GLASSREFRACTIONVS", "GLASSREFRACTIONFS", stateMap, "Forward");
    }
    constructor(){
        super();
        /**
        * 设置distortion
        */
        this.setShaderName("GLASSREFRACTIONSHADER");
    }
       set bumpTexture(value){
        if (value) {
            this._shaderValues.setTexture(GlassRefractionMaterial.BUMPTEXTURE, value);
        }
    }
       set distortion(value){
        if (value) {
            this._shaderValues.setNumber(GlassRefractionMaterial.DISTORTION, value);
        }
    }
       set refractiontelsize(value){
        if (value) {
            this._shaderValues.setVector(GlassRefractionMaterial.REFRACTIONTEXELSZIE, value);
        }
    }
       set refractAmount(value){
        if (value) {
            this._shaderValues.setNumber(GlassRefractionMaterial.REFRACTAMOUNT, value);
        }
    }
       set mainTexture(value){
        if (value) {
            this._shaderValues.setTexture(GlassRefractionMaterial.MAINTEXTURE, value);
        }
    }
       set cubeTexture(value){
        if (value) {
            this._shaderValues.setTexture(GlassRefractionMaterial.CUBETEXTURE, value);
        }
    }
}